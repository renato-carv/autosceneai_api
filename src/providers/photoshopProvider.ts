import { injectable } from 'tsyringe';
import { ValidationError } from '../errors/validationError.js';

@injectable()
export class PhotoshopProvider {
  private clientId = process.env.PS_FF_SERVICES_CLIENT_ID!;
  private clientSecret = process.env.PS_FF_SERVICES_CLIENT_SECRET!;

  private cachedToken: string = '';
  private expiresAt = 0;

  private async getAccessToken() {
    if (this.cachedToken && Date.now() < this.expiresAt) {
      return this.cachedToken;
    }

    const response = await fetch(
      'https://ims-na1.adobelogin.com/ims/token/v3',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret,
          scope: 'openid,AdobeID,read_organizations',
        }),
      },
    );

    const data = await response.json();

    this.cachedToken = data.access_token;
    this.expiresAt = Date.now() + (data.expires_in - 300) * 1000;

    return this.cachedToken;
  }

  async removeBackground(base64: string): Promise<string> {
    if (!base64) throw new ValidationError('Imagem inválida');

    const token = await this.getAccessToken();

    const res = await fetch('https://image.adobe.io/v2/remove-background', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.clientId,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: { source: { base64 } },
        mode: 'cutout',
        output: { mediaType: 'image/png' },
        trim: false,
      }),
    });

    const job = await res.json();

    const status = await this.pollStatus(job.statusUrl, token);

    const imageRes = await fetch(status.outputs.image.url);
    const buffer = await imageRes.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
  }

  private async pollStatus(url: string, token: string) {
    while (true) {
      const res = await fetch(url, {
        headers: {
          'x-api-key': this.clientId,
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === 'succeeded') return data;
      if (data.status === 'failed') throw new Error('Processamento falhou');

      await new Promise(r => setTimeout(r, 2000));
    }
  }
}
