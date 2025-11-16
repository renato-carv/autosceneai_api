import { ApiError } from './apiError.js';

export class ValidationError extends ApiError {
  constructor(message: string, details?: any) {
    super(400, message, details);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
