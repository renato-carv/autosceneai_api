import { injectable } from 'tsyringe';
import { GoogleGenerativeAI } from '@google/generative-ai';

@injectable()
export class AIService {
  private genAi: GoogleGenerativeAI;

  constructor() {
    if (!process.env.GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY não configurada no ambiente');
    }
    this.genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
  }

  async transformCarScene(base64code: string, scenario: string) {
    if (!base64code || base64code.trim() === '') {
      throw new Error('Imagem inválida ou não fornecida');
    }

    if (!scenario || scenario.trim() === '') {
      throw new Error('Cenário não fornecido');
    }

    const prompt = `Você é um modelo especializado em manipulação visual precisa.
        Tarefa:
        - transformar APENAS o cenário ao redor do veículo
        - mantendo o carro absolutamente intacto: cor, textura, sujeiras, arranhões, amassados, marcas, danos, pneus, placa, iluminação do carro, ângulo e perspectiva originais.
        - Não alterar NENHUM detalhe estrutural ou visual do veículo.

        Regras obrigatórias:
        1. NUNCA modificar a carroceria, pintura, rodas, pneus, alinhamento ou formato.
        2. NÃO remover defeitos, riscos, sujeira, danos, ferrugem ou desgaste.
        3. Manter o veículo exatamente como está na imagem original.
        4. Alterar SOMENTE o cenário, fundo ou ambiente.
        5. Ajustar a iluminação do cenário para combinar com a iluminação real do carro.
        6. Manter o mesmo ângulo e enquadramento do veículo.
        7. Não adicionar reflexos irreais no carro.
        8. Não adicionar pessoas próximas ao carro.

        Cenário desejado:
        ${scenario}

        Retorne a imagem final somente com o novo cenário.
    `;

    const model = this.genAi.getGenerativeModel({
      model: 'gemini-2.5-flash-image',
    });

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64code,
          mimeType: 'image/png',
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
