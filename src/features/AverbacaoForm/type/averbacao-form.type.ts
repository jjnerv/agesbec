import type { Averbacao } from "../../averbacao/schemas/averbacao.schema";
import type { AverbacaoFormData } from "../schemas/averbacao-form.schema";

export type AverbacaoFormProps = {
  registro: Averbacao;
  onSubmit: (values: AverbacaoFormData) => void;
};

export type EnvioAverbacao = {
  id: string;
  dta: string;
  processo: "DUIMP" | "DI";
  status: "enviando" | "concluido" | "erro";
  mensagem?: string;
  criadoEm: string;
};