import { container } from 'tsyringe';
import { AIService } from '../../services/ai/ai.service.js';
import { QuotaExceededError } from '../../errors/quotaExceedError.js';
import type { Request, Response } from 'express';

export class PostChatController {
  async handle(req: Request, res: Response) {
    const { scenario, image } = req.body;

    if (!scenario || !image) {
      return res
        .status(400)
        .json({ error: 'Imagem e cenário são obrigatórios' });
    }

    const base64code = image.includes('base64,')
      ? image.split('base64,')[1]
      : image;

    const aiService = container.resolve(AIService);

    try {
      const transformedImage = await aiService.transformCarScene(
        base64code,
        scenario,
      );

      return res.json({
        message: 'Imagem transformada com sucesso',
        image: transformedImage,
      });
    } catch (error: any) {
      if (error.message.includes('429')) {
        throw new QuotaExceededError(
          'Você excedeu o limite de requisições da API.',
          error.message,
        );
      }
      throw error;
    }
  }
}
