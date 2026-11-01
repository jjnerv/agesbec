import styles from "./Averbacaotable.module.scss";
import { useState } from "react";
import { useAverbacoesPorModal } from "./hooks/useAverbacoesPorModal";
import type { Modal } from "../modal/schemas/modal.schema";

function AverbacaoTable({ modal }: { modal: Modal }) {
  const [page, setPage] = useState(1);
  const { data, isPending, error, isFetching } =
    useAverbacoesPorModal(modal.id, page);

  return (
    <section className={styles.container}>
      <h2>{modal.nome.toUpperCase()} - {modal.modal}</h2>

      {isPending && <p>Carregando…</p>}
      {error && <p role="alert">{error.message}</p>}

      {data && (
        <>
          <table>
            <thead>
              <tr>
                <th>MODAL</th>
                <th>DTA</th>
                <th>DUIMP / DI</th>
                <th>Razão Social</th>
                <th>Data do envio</th>
                <th>País</th>
                <th>Conhecimento</th>
                <th>Arquivos</th>
              </tr>
            </thead>
            <tbody>
              {data.map((averbacao) => (
                <tr key={averbacao.id}>
                  <td>{averbacao.modalId}</td>
                  <td>{averbacao.dta}</td>
                  <td>{averbacao.duimp} - {averbacao.di}</td>
                  <td>{averbacao.razao}</td>
                  <td>{new Date(averbacao.data).toLocaleDateString()}</td>
                  <td>{averbacao.paisId}</td>
                  <td>{averbacao.conhecimento}</td>
                  <td>
                    {averbacao.arquivos.map((arquivo) => (
                      <span key={arquivo}>{arquivo}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            type="button"
            disabled={page === 1 || isFetching}
            onClick={() => setPage((current) => current - 1)}
          >
            Anterior
          </button>

          <span>Página {page}</span>

          <button
            type="button"
            disabled={isFetching || data.length < 5}
            onClick={() => setPage((current) => current + 1)}
          >
            Próxima
          </button>
        </>
      )}
    </section>
  );
}

export default AverbacaoTable;