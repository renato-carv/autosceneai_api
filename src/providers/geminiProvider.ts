import { injectable } from 'tsyringe';
import type { IGeminiProvider } from '../interfaces/IGeminiProvider.js';
import { ValidationError } from '../errors/validationError.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

@injectable()
export class GeminiProvider implements IGeminiProvider {
  private genAi: GoogleGenerativeAI;
  constructor() {
    if (!process.env.GOOGLE_API_KEY) {
      throw new ValidationError('GOOGLE_API_KEY não configurada no ambiente');
    }
    this.genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  }

  async generateBackground(
    base64: string,
    scenario: string,
    mimeType: string = 'image/png',
  ): Promise<string> {
    if (!base64 || base64.trim() === '') {
      throw new ValidationError('Imagem inválida ou não fornecida');
    }
    if (!scenario || scenario.trim() === '') {
      throw new ValidationError('Cenário não fornecido');
    }

    const prompt = `Você é um modelo especializado em manipulação visual precisa.
        Transforme apenas o cenário ao redor do carro, mantendo-o intacto.
        Cenário desejado: ${scenario}`;

    const model = await this.genAi.getGenerativeModel({
      model: 'gemini-2.5-flash-image',
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64,
          mimeType,
        },
      },
      { text: prompt },
    ]);

    const response = await result.response;

    const imageData =
      response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!imageData) {
      console.error(
        'Resposta completa do Gemini:',
        JSON.stringify(response, null, 2),
      );
      throw new Error('A IA não retornou uma imagem válida');
    }

    return imageData;
  }
}
