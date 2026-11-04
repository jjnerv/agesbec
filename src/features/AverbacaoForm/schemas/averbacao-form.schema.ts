import { z } from "zod";
import { DTA_DI_PATTERN, DUIMP_PATTERN } from "../utils/document-masks";

const selectedFileSchema = z.custom<File | null>(
  (value) => value === null || (typeof File !== "undefined" && value instanceof File),
);

export const averbacaoFormSchema = z.object({
  tipoProcesso: z.enum(["DUIMP", "DI"]),
  pdf: selectedFileSchema,
  xml: selectedFileSchema,
  numeroDuimp: z.string(),
  numeroDi: z.string(),
  chave: z.string(),
  comissaria: z.string().min(1, "Selecione a comissária."),
  referencia: z.string(),
  cambial: z.boolean(),
}).superRefine((values, context) => {
  if (!values.pdf) {
    context.addIssue({ code: "custom", path: ["pdf"], message: "Selecione o arquivo PDF." });
  } else if (!values.pdf.name.toLowerCase().endsWith(".pdf")) {
    context.addIssue({ code: "custom", path: ["pdf"], message: "O arquivo deve estar no formato PDF." });
  }

  if (values.tipoProcesso === "DUIMP") {
    if (!DUIMP_PATTERN.test(values.numeroDuimp)) {
      context.addIssue({ code: "custom", path: ["numeroDuimp"], message: "Informe a DUIMP no formato 26BR0000123456-7." });
    }
    if (!values.chave.trim()) {
      context.addIssue({ code: "custom", path: ["chave"], message: "Informe a chave de acesso." });
    }
  }

  if (values.tipoProcesso === "DI") {
    if (!DTA_DI_PATTERN.test(values.numeroDi)) {
      context.addIssue({ code: "custom", path: ["numeroDi"], message: "Informe a DI no formato 25/0000000-1." });
    }
    if (!values.xml) {
      context.addIssue({ code: "custom", path: ["xml"], message: "Selecione o arquivo XML." });
    } else if (!values.xml.name.toLowerCase().endsWith(".xml")) {
      context.addIssue({ code: "custom", path: ["xml"], message: "O arquivo deve estar no formato XML." });
    }
  }
});

export type AverbacaoFormData = z.infer<typeof averbacaoFormSchema>;
