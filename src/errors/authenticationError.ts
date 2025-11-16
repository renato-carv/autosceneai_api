import { ApiError } from './apiError.js';

export class AuthenticationError extends ApiError {
  constructor(message: string, details?: any) {
    super(401, message, details);
    Object.setPrototypeOf(this, AuthenticationError.prototype);
  }
}
