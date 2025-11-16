import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable, inject } from "tsyringe";
import type { IAuthRepository } from "../../interfaces/IAuthRepository.js";

@injectable()
export class AuthService {
  constructor(
    @inject("AuthRepository")
    private authRepository: IAuthRepository
  ) {}

  async login(email: string, password: string) {
    const user = await this.authRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    return {
      message: "Login realizado com sucesso",
      token
    };
  }
}
