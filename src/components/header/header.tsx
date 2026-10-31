import styles from './header.module.scss'
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/useAuth";

function Header() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  function handleLogout() {
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }

  return (
    <main className={styles.container}>
      <img src="./logo-light.png" alt="Logo Empresa Agesbec" className={styles.logo} />
      <nav className={styles.navigation}>
        <li><a href="#">Averbação</a></li>
        <li><a href="#">Consulta</a></li>
      </nav>

      <a href="#" className={styles.logout} onClick={handleLogout}>Logout</a>
    </main>
  );
}

export default Header;