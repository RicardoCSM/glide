import * as z from "zod"

export const currentUserEditSchema = z.object({
  name: z.string().min(4, { message: 'É necessário no mínimo 4 caractéres!'}),
  email: z.string().email({ message: 'Email inválido!'}),
  current_password: z.string().min(8, { message: 'É necessário no mínimo 8 caractéres!'}).optional().or(z.literal('')),
  password: z.string().min(8, { message: 'É necessário no mínimo 8 caractéres!'}).optional().or(z.literal('')),
  password_confirmation: z.string().min(8, { message: 'É necessário no mínimo 8 caractéres!'}).optional().or(z.literal('')),
}).superRefine(({ password_confirmation, password, current_password }, ctx) => {
    if (password_confirmation !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não se correspondem!",
        path: ['password_confirmation']
      });
    }

    if (password && !current_password) {
      ctx.addIssue({
        code: "custom",
        message: "A senha atual é obrigatória para alterar a senha!",
        path: ['current_password']
      });
    }
});


export interface modifiedEditCurrentUserSchema {
  name?: string;
  email?: string;
  password?: string;
  password_confirmation?: string;
  current_password?: string;
}