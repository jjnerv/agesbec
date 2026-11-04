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
  referencia: z.number().nullable().transform((value) => value ?? 0),
  cambial: z.boolean(),
  statusId: z.number(),
  status: z.string(),
  chave: z.string(),
  modalId: z.number().int(),
});

export const averbacoesSchema = z.array(averbacaoSchema);

export type Averbacao = z.infer<typeof averbacaoSchema>;
