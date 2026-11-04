import { useState } from "react";
import { Menu, X } from "lucide-react";
import styles from './header.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/context/useAuth";

function Header() {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    closeMenu();
    setIsAuthenticated(false);
    navigate("/login", { replace: true });
  }

  return (
    <header className={styles.container}>
      <img src="./logo-light.png" alt="Logo Empresa Agesbec" className={styles.logo} />
      <button
        type="button"
        className={styles["menu-toggle"]}
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={25} /> : <Menu size={25} />}
      </button>
      <nav id="primary-navigation" className={`${styles.navigation} ${menuOpen ? styles["navigation-open"] : ""}`} aria-label="Navegação principal">
        <ul>
          <li><Link to="/averbacao" onClick={closeMenu}>Averbação</Link></li>
          <li><Link to="/dashboard" onClick={closeMenu}>Consulta</Link></li>
          <li className={styles["logout-item"]}>
            <button type="button" className={styles.logout} onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
