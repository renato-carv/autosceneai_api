import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AIService } from '../../services/ai/ai.service.js';
import { QuotaExceededError } from '../../errors/quotaExceedError.js';

export class PostChatController {
  private aiService = container.resolve(AIService);
  async handle(req: Request, res: Response) {
    const { scenario, image } = req.body;
    try {
      const imageUrl = await this.aiService.transformCarScene(image, scenario);
      return res.json({
        message: 'Imagem transformada com sucesso',
        imageUrl,
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
