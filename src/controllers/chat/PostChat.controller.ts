import type { Request, Response } from "express";
import { container } from "tsyringe";
import { AIService } from "../../services/ai/ai.service.js";

export class PostChatController {
  async handle(req: Request, res: Response) {
    try {
      const { scenario } = req.body;
      const image = req.file;

      const aiService = container.resolve(AIService);
      const transformedImage = await aiService.transformCarScene(
        image?.buffer.toString("base64") || "",
        scenario
      );

      return res.json({
        message: "Imagem transformada com sucesso",
        image: transformedImage,
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
