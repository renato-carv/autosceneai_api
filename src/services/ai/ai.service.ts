import { injectable, inject } from 'tsyringe';
import type { IPhotoshopProvider } from '../../interfaces/IPhotoshopProvider.js';
import type { IGeminiProvider } from '../../interfaces/IGeminiProvider.js';

@injectable()
export class AIService {
  constructor(
    @inject('PhotoshopProvider') private photoshopProvider: IPhotoshopProvider,
    @inject('GeminiProvider') private geminiProvider: IGeminiProvider,
  ) {}

  async transformCarScene(base64: string, scenario: string): Promise<string> {
    const carLayer = await this.photoshopProvider.removeBackground(base64);
    // const finalImage = await this.geminiProvider.generateBackground(carLayer, scenario);
    // return finalImage;
    return carLayer;
  }
}
