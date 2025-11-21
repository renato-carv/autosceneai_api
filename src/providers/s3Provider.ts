import { injectable } from 'tsyringe';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { ValidationError } from '../errors/validationError.js';

@injectable()
export class S3Provider {
  private s3Client: S3Client;
  private bucketName = process.env.AWS_BUCKET_NAME!;
  private region = process.env.AWS_REGION!;

  constructor() {
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async uploadBase64(base64: string, folder = 'uploads'): Promise<string> {
    if (!base64) throw new ValidationError('Imagem inválida');

    const matches = base64.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches || !matches[2] || !matches[1]) {
      throw new ValidationError('Base64 inválido ou tipo não suportado');
    }

    const extension = matches[1];
    const data = matches[2];

    const buffer = Buffer.from(data, 'base64');
    const fileName = `${folder}/${uuidv4()}.${extension}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: buffer,
        ContentType: `image/${extension}`,
      }),
    );

    return `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
  }
}
