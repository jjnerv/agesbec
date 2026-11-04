import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Averbacao } from "../../../features/averbacao/schemas/averbacao.schema";
import type { AverbacaoFormData } from "../../../features/AverbacaoForm/schemas/averbacao-form.schema";
import { useNotifications } from "../../../shared/notifications/hooks/useNotifications";
import type { EnvioAverbacao } from "../../../features/AverbacaoForm/type/averbacao-form.type";
import { useModais } from "../../../features/modal/hooks/useModais";
import { buscarAverbacaoPorDta } from "../../../features/averbacao/api/averbacao.api";
import { enviarAverbacao } from "../../../features/averbacao/api/averbacao.api";
import { DTA_DI_PATTERN, formatDtaDi, onlyDigits } from "../../../features/AverbacaoForm/utils/document-masks";

export function useAverbacaoSubmit() {
  const [envios, setEnvios] = useState<EnvioAverbacao[]>([]);
  const { notify } = useNotifications();
  const erroNotificadoEm = useRef(0);
  const { data: modais = [] } = useModais();
  const [dtaConsultada, setDtaConsultada] = useState("");
  const [dta, setDta] = useState("");

  const consulta = useQuery({
    queryKey: ["averbacao-por-dta", dtaConsultada],
    queryFn: ({ signal }) => buscarAverbacaoPorDta(dtaConsultada, signal),
    enabled: Boolean(dtaConsultada),
    retry: false,
  });
  const registro = consulta.data;

  useEffect(() => {
    if (consulta.isError && consulta.errorUpdatedAt !== erroNotificadoEm.current) {
      erroNotificadoEm.current = consulta.errorUpdatedAt;
      notify("error", consulta.error.message);
    }
  }, [consulta.error, consulta.errorUpdatedAt, consulta.isError, notify]);

  const modalNome = useMemo(() => {
    if (!registro) return "";
    const modal = modais.find((item) => item.id === String(registro.modalId));
    return modal ? `${modal.nome} — ${modal.modal}` : `Modal ${registro.modalId}`;
  }, [modais, registro]);

  function consultarDta(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valorFormatado = formatDtaDi(dta);
    const valor = onlyDigits(valorFormatado);
    if (!DTA_DI_PATTERN.test(valorFormatado)) {
      notify("error", "Informe a DTA no formato 25/0000000-1.");
      return;
    }

    if (valor === dtaConsultada) {
      void consulta.refetch();
    } else {
      setDtaConsultada(valor);
    }
  }  

  function atualizarEnvio(id: string, changes: Partial<EnvioAverbacao>) {
    setEnvios((items) => items.map((item) => item.id === id ? { ...item, ...changes } : item));
  }

  async function submit(values: AverbacaoFormData, registro: Averbacao) {
    const envioId = crypto.randomUUID();
    const envio: EnvioAverbacao = {
      id: envioId,
      dta: formatDtaDi(String(registro.dta)),
      processo: values.tipoProcesso,
      status: "enviando",
      criadoEm: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    };
    setEnvios((items) => [envio, ...items]);

    const dadosDta = { ...registro };
    delete dadosDta.id;
    const payload = {
      ...dadosDta,
      duimp: values.tipoProcesso === "DUIMP" ? Number(onlyDigits(values.numeroDuimp)) : 0,
      di: values.tipoProcesso === "DI" ? Number(onlyDigits(values.numeroDi)) : 0,
      chave: values.tipoProcesso === "DUIMP" ? values.chave.trim() : "",
      arquivos: [values.pdf?.name, ...(values.tipoProcesso === "DI" ? [values.xml?.name] : [])].filter((nome): nome is string => Boolean(nome)),
      comissaria: Number(values.comissaria),
      referencia: values.referencia.trim() ? Number(values.referencia) : 0,
      cambial: values.cambial,
      statusId: 1,
      status: "Enviando",
      data: Date.now(),
    } satisfies Omit<Averbacao, "id">;

    try {
      await enviarAverbacao(payload);
      atualizarEnvio(envioId, { status: "concluido", mensagem: "Envio concluído." });
      notify("success", `A averbação da DTA ${registro.dta} foi enviada.`);
    } catch (error) {
      const mensagem = error instanceof Error ? error.message : "Falha inesperada no envio.";
      atualizarEnvio(envioId, { status: "erro", mensagem });
      notify("error", mensagem);
    }
  }

  return { envios, submit, setDta, dta, registro, modalNome, consultarDta, consulta, setDtaConsultada };
}
