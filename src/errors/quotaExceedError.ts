import { ApiError } from './apiError.js';

export class QuotaExceededError extends ApiError {
  constructor(message: string, details?: any) {
    super(429, message, details);
    Object.setPrototypeOf(this, QuotaExceededError.prototype);
  }
}
