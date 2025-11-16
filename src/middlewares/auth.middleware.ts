import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationError } from '../errors/validationError.js';

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const auth = req.headers.authorization;

  if (!auth) throw new ValidationError('Token não fornecido');

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (err) {
    throw new ValidationError('Token inválido');
  }
}
