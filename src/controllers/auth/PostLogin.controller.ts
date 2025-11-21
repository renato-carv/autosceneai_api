import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthService } from '../../services/auth/auth.service.js';

export class AuthController {
  private authService = container.resolve(AuthService);
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this.authService.login(email, password);
    return res.json(result);
  }
}
