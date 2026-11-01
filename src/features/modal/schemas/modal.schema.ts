import { z } from "zod";

export const modalSchema = z.object({
  id: z.string(),
  modal: z.string(),
  nome: z.string(),
});
 
export const modaisSchema = z.array(modalSchema);

export type Modal = z.infer<typeof modalSchema>;