import prisma from '../config/database.config.js';
import { injectable } from 'tsyringe';
import type { IAuthRepository } from '../interfaces/IAuthRepository.js';
import type { User } from '@prisma/client';

@injectable()
export class AuthRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }
}
