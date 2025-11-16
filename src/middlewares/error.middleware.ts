import type { Request, Response, NextFunction } from 'express';
import { ApiError } from '../errors/apiError.js';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.constructor.name,
      message: err.message,
      details: err.details,
    });
  }

  console.error(err);
  return res.status(500).json({
    error: 'InternalServerError',
    message: 'Ocorreu um erro inesperado.',
  });
};
