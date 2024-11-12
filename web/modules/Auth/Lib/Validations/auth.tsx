import * as z from "zod"

export const userAuthSchema = z.object({
  login: z.string().min(1, { message: 'Campo obrigatório!'}),
  password: z.string().min(8, { message: 'É necessário no mínimo 8 caractéres!'})
})