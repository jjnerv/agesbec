import { z } from "zod";

export const averbacaoSchema = z.object({
  id: z.string(),
  createdAt: z.string(),
  name: z.string(),
  avatar: z.string(),
  dta: z.number(),
  razao: z.string(),
  data: z.number(),
  paisId: z.number(),
  conhecimento: z.number(),
  duimp: z.number(),
  di: z.number(),
  arquivos: z.array(z.string()),
  comissaria: z.number(),
  referencia: z.number(),
  cambial: z.boolean(),
  statusId: z.number(),
  chave: z.string(),
  modalId: z.number().int(),
});

export const averbacoesSchema = z.array(averbacaoSchema);

export type Averbacao = z.infer<typeof averbacaoSchema>;