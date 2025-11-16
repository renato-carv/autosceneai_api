import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email({ message: "Email inválido" })
    .nonempty({ message: "Email é obrigatório" })
    .transform((e) => e.trim()),

  password: z
    .string()
    .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
    .nonempty({ message: "Senha é obrigatória" })
    .trim(),
});
