import styles from "./Averbacaotable.module.scss";
import AverbacaoTable from "./AverbacaoTable";
import { useModais } from "../modal/hooks/useModais";

function AverbacaoTables() {
const { data: modais = [], isPending, error } = useModais();

if (isPending) return <p>Carregando modais…</p>; 
if (error) return <p role="alert">{error.message}</p>;
 
    return (
    <main className={styles.container}>
        {modais.map((modal) => (
            <AverbacaoTable key={modal.id} modal={modal} />
        ))}
    </main>
    );
}

export default AverbacaoTables;