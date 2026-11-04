import { useEffect, useRef } from "react";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp } from "lucide-react";
import type { AverbacaoFormProps } from "./type/averbacao-form.type";
import { averbacaoFormSchema, type AverbacaoFormData } from "./schemas/averbacao-form.schema";
import { useNotifications } from "../../shared/notifications/hooks/useNotifications";
import styles from "./averbacao-form.module.scss";
import { valoresIniciais } from "./constants/averbacao-form.constants";
import { formatDtaDi, formatDuimp } from "./utils/document-masks";

function AverbacaoForm({ registro, onSubmit }: AverbacaoFormProps) {
  const { notify } = useNotifications();
  const ultimaNotificacao = useRef<string | null>(null);
  const {
    register,
    control,
    setValue,
    reset,
    handleSubmit,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<AverbacaoFormData>({
    resolver: zodResolver(averbacaoFormSchema),
    defaultValues: valoresIniciais,
    mode: "onChange",
  });
  const tipoProcesso = useWatch({ control, name: "tipoProcesso" }) ?? valoresIniciais.tipoProcesso;
  const coberturaCambial = useWatch({ control, name: "cambial" }) ?? valoresIniciais.cambial;
  const arquivoPdf = useWatch({ control, name: "pdf" });
  const arquivoXml = useWatch({ control, name: "xml" });
  const primeiraMensagem = Object.values(errors)
    .map((error) => error?.message)
    .find((message): message is string => typeof message === "string");

  useEffect(() => {
    const usuarioInteragiu = isSubmitted || Object.keys(touchedFields).length > 0;
    if (!usuarioInteragiu) return;

    if (!primeiraMensagem) {
      ultimaNotificacao.current = null;
      return;
    }

    if (ultimaNotificacao.current !== primeiraMensagem) {
      ultimaNotificacao.current = primeiraMensagem;
      notify("error", primeiraMensagem);
    }
  }, [isSubmitted, notify, primeiraMensagem, touchedFields]);

  function enviarFormulario(values: AverbacaoFormData) {
    onSubmit(values);
    reset(valoresIniciais);
  }

  function alterarTipoProcesso() {
    setValue("pdf", null, { shouldValidate: true });
    setValue("xml", null, { shouldValidate: true });
    setValue("numeroDuimp", "", { shouldValidate: true });
    setValue("numeroDi", "", { shouldValidate: true });
    setValue("chave", "", { shouldValidate: true });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(enviarFormulario)} noValidate>
      <fieldset className={styles["process-choice"]}>
        <legend>Tipo de processo <span className={styles.required} aria-hidden="true">*</span></legend>
        <label className={tipoProcesso === "DUIMP" ? styles["selected-option"] : ""}>
          <input type="radio" value="DUIMP" required {...register("tipoProcesso", { onChange: alterarTipoProcesso })} />
          DUIMP
        </label>
        <label className={tipoProcesso === "DI" ? styles["selected-option"] : ""}>
          <input type="radio" value="DI" required {...register("tipoProcesso", { onChange: alterarTipoProcesso })} />
          DI
        </label>
      </fieldset>

      <div className={styles["form-grid"]}>
        {tipoProcesso === "DUIMP" && (
          <>
            <Controller
              name="numeroDuimp"
              control={control}
              render={({ field }) => (
                <label>Número da DUIMP <span className={styles.required} aria-hidden="true">*</span>
                  <input {...field} required value={field.value ?? ""} onChange={(event) => field.onChange(formatDuimp(event.target.value))} placeholder="26BR0000123456-7" maxLength={16} inputMode="numeric" aria-invalid={Boolean(errors.numeroDuimp)} />
                </label>
              )}
            />
            <label>Chave de acesso <span className={styles.required} aria-hidden="true">*</span>
              <input {...register("chave")} required aria-invalid={Boolean(errors.chave)} />
            </label>
          </>
        )}

        {tipoProcesso === "DI" && (
          <Controller
            name="numeroDi"
            control={control}
            render={({ field }) => (
              <label>Número da DI <span className={styles.required} aria-hidden="true">*</span>
                <input {...field} required value={field.value ?? ""} onChange={(event) => field.onChange(formatDtaDi(event.target.value))} placeholder="25/0000000-1" maxLength={12} inputMode="numeric" aria-invalid={Boolean(errors.numeroDi)} />
              </label>
            )}
          />
        )}

        <Controller
          name="pdf"
          control={control}
          render={({ field: { onChange, name, ref } }) => (
        <label className={styles["file-field"]}>Arquivo PDF <span className={styles.required} aria-hidden="true">*</span>
              <span><FileUp size={18} />{arquivoPdf?.name ?? "Selecionar arquivo PDF"}</span>
              <input ref={ref} name={name} type="file" required accept="application/pdf,.pdf" onChange={(event) => onChange(event.target.files?.[0] ?? null)} aria-invalid={Boolean(errors.pdf)} />
            </label>
          )}
        />

        {tipoProcesso === "DI" && (
          <Controller
            name="xml"
            control={control}
            render={({ field: { onChange, name, ref } }) => (
            <label className={styles["file-field"]}>Arquivo XML <span className={styles.required} aria-hidden="true">*</span>
                <span><FileUp size={18} />{arquivoXml?.name ?? "Selecionar arquivo XML"}</span>
                <input ref={ref} name={name} type="file" required accept="application/xml,text/xml,.xml" onChange={(event) => onChange(event.target.files?.[0] ?? null)} aria-invalid={Boolean(errors.xml)} />
              </label>
            )}
          />
        )}
      </div>

      <div className={styles["form-grid"]}>
        <label>Comissária <span className={styles.required} aria-hidden="true">*</span>
          <select {...register("comissaria")} required aria-invalid={Boolean(errors.comissaria)}>
            <option value="">Selecione a comissária</option>
            <option value={registro.comissaria}>Comissária {registro.comissaria}</option>
          </select>
        </label>
        <label>Código de referência
          <span className={styles.optional}>(opcional)</span>
          <input {...register("referencia")} inputMode="numeric" />
        </label>
        <fieldset className={styles.cambial}>
          <legend>Cobertura cambial <span className={styles.required} aria-hidden="true">*</span></legend>
          <label className={!coberturaCambial ? styles["selected-option"] : ""}>
            <input type="radio" name="cambial" value="nao" required checked={!coberturaCambial} onChange={() => setValue("cambial", false, { shouldValidate: true })} /> Não
          </label>
          <label className={coberturaCambial ? styles["selected-option"] : ""}>
            <input type="radio" name="cambial" value="sim" required checked={coberturaCambial} onChange={() => setValue("cambial", true, { shouldValidate: true })} /> Sim
          </label>
        </fieldset>
      </div>

      <div className={styles["submit-row"]}>
        <p>Confira os dados e os arquivos antes de enviar.</p>
        <button type="submit" disabled={!isValid}>Enviar para averbação</button>
      </div>
    </form>
  );
}

export default AverbacaoForm;
