import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.navList}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Catalog
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
