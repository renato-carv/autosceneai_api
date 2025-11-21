import { injectable, inject } from 'tsyringe';
import type { IPhotoshopProvider } from '../../interfaces/IPhotoshopProvider.js';
import type { IGeminiProvider } from '../../interfaces/IGeminiProvider.js';
import type { IS3Provider } from '../../interfaces/IS3Provider.js';

@injectable()
export class AIService {
  constructor(
    @inject('PhotoshopProvider') private photoshopProvider: IPhotoshopProvider,
    @inject('GeminiProvider') private geminiProvider: IGeminiProvider,
    @inject('S3Provider') private s3Provider: IS3Provider,
  ) {}

  async transformCarScene(base64: string, scenario: string): Promise<string> {
    const url = await this.s3Provider.uploadBase64(base64, 'uploads');
    // const carLayer = await this.photoshopProvider.removeBackground(base64);
    // const finalImage = await this.geminiProvider.generateBackground(carLayer, scenario);
    // return finalImage;
    return url;
  }
}
