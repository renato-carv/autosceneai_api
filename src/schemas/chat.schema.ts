import z from 'zod';

export const chatSchema = z.object({
  image: z.string().nonempty({ message: 'Imagem inválida ou não fornecida' }),
  scenario: z.string().nonempty({ message: 'Cenário não fornecido' }),
});
