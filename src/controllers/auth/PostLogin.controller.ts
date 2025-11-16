import type { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthService } from '../../services/auth/auth.service.js';

export class AuthController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;
    const authService = container.resolve(AuthService);
    const result = await authService.login(email, password);
    return res.json(result);
  }
}
