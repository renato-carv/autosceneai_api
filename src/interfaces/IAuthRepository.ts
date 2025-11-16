import type { User } from "@prisma/client";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
}
