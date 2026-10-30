import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Informe um e-mail válido"),
  password: z.string().min(5, "A senha deve ter pelo menos 5 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
