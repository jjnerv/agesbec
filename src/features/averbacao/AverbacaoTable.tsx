import styles from "./averbacao.module.scss";
import { useState } from "react";
import { useAverbacoesPorModal } from "./hooks/useAverbacoesPorModal";
import type { Modal } from "../modal/schemas/modal.schema";
import { Eye } from 'lucide-react';

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
          <table className={styles.table}> 
            <thead>
              <tr>
                <th>DTA</th>
                <th>DUIMP / DI</th>
                <th>Razão Social</th>
                <th>Data do envio</th>
                <th>País</th>
                <th>Conhecimento</th>
                <th>Status do envio</th>
                <th>Arquivos</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((averbacao) => (
                <tr key={averbacao.id}>
                  <td>{averbacao.dta}</td>
                  <td>{averbacao.duimp} - {averbacao.di}</td>
                  <td>{averbacao.razao}</td>
                  <td>{new Date(averbacao.data).toLocaleDateString()}</td>
                  <td>{averbacao.paisId}</td>
                  <td>{averbacao.conhecimento}</td>
                  <td>{averbacao.status}</td>
                  <td>
                    {averbacao.arquivos.map((arquivo) => (
                      <span key={arquivo}>{arquivo}</span>
                    ))}
                  </td>
                  <td>
                    <button type="button" title="Visualizar Documento" onClick={() => alert(`Visualizar Documento ${averbacao.id}`)}>
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className={styles.paginacao}>

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
            </div>  
          
        </>
      )}
    </section>
  );
}

export default AverbacaoTable;