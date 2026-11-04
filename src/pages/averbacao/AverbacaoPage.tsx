import { AlertCircle, CheckCircle2, Clock3, Search } from "lucide-react";
import AverbacaoForm from "../../features/AverbacaoForm/AverbacaoForm";
import { useAverbacaoSubmit } from "./hooks/useAverbacaoSubmit";
import Header from "../../components/header";
import styles from "./averbacao-page.module.scss";
import { formatDtaDi } from "../../features/AverbacaoForm/utils/document-masks";
 
function AverbacaoPage() {
  const { envios, submit, dta, setDta, registro, modalNome, consultarDta, consulta, setDtaConsultada } = useAverbacaoSubmit();

  return (
    <>
      <Header />
      <main className={styles.page}>
        <div className={styles.heading}>
          <div>
            <p className={styles.eyebrow}>OPERAÇÕES</p>
            <h1>Averbação de documentos</h1>
            <p>Consulte a DTA, informe os dados do processo e acompanhe cada envio.</p>
          </div>
        </div>

        <section className={styles.card} aria-labelledby="consulta-title">
          <h2 id="consulta-title">1. Consultar DTA</h2>
          <form className={styles["search-form"]} onSubmit={consultarDta} noValidate>
            <label htmlFor="dta-consulta">Número da DTA <span className={styles.required} aria-hidden="true">*</span></label>
            <div className={styles["search-row"]}>
              <input
                id="dta-consulta"
                aria-required="true"
                value={dta}
                onChange={(event) => {
                  setDta(formatDtaDi(event.target.value));
                  setDtaConsultada("");
                }}
                inputMode="numeric"
                maxLength={12}
                placeholder="25/0000000-1"
              />
              <button type="submit" disabled={!dta.trim() || consulta.isFetching}>
                <Search size={17} /> {consulta.isFetching ? "Consultando…" : "Consultar"}
              </button>
            </div>
          </form>
        </section>

        {registro && (
          <>
            <section className={styles.card} aria-labelledby="dta-data-title">
              <h2 id="dta-data-title">Dados da DTA</h2>
              <dl className={styles["data-grid"]}>
                <div><dt>Número da DTA</dt><dd>{formatDtaDi(String(registro.dta))}</dd></div>
                <div><dt>Razão social do importador</dt><dd>{registro.razao}</dd></div>
                <div><dt>Cadastro do importador</dt><dd>{new Date(registro.createdAt).toLocaleDateString("pt-BR")}</dd></div>
                <div><dt>País de origem</dt><dd>{registro.paisId}</dd></div>
                <div><dt>Modal</dt><dd>{modalNome}</dd></div>
                <div><dt>Número do conhecimento</dt><dd>{registro.conhecimento}</dd></div>
              </dl>
            </section>

            <section className={styles.card} aria-labelledby="processo-title">
              <h2 id="processo-title">2. Dados do processo e documentos</h2>
              <AverbacaoForm registro={registro} onSubmit={(values) => void submit(values, registro)} />
            </section>
          </>
        )}

        {envios.length > 0 && (
          <section className={styles.card} aria-labelledby="envios-title">
            <h2 id="envios-title">Acompanhamento dos envios</h2>
            <ul className={styles.submissions}>
              {envios.map((envio) => (
                <li key={envio.id}>
                  <div><strong>DTA {envio.dta} · {envio.processo}</strong><span>Iniciado às {envio.criadoEm}</span></div>
                  <span className={`${styles.status} ${styles[envio.status]}`} aria-live="polite">
                    {envio.status === "enviando" && <><Clock3 size={16} /> Processando</>}
                    {envio.status === "concluido" && <><CheckCircle2 size={16} /> Concluído</>}
                    {envio.status === "erro" && <><AlertCircle size={16} /> Erro</>}
                  </span>
                  {envio.mensagem && <p className={envio.status === "erro" ? styles["error-message"] : styles["success-message"]}>{envio.mensagem}</p>}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}

export default AverbacaoPage;
