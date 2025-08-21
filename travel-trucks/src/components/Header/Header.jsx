import { NavLink } from "react-router-dom";
import s from "./Header.module.css";
import sprite from "../../assets/icons/sprite.svg";

function Header() {
  return (
    <header className={s.header}>
      <svg className={s.icon}>
        <use href={`${sprite}#icon-TravelTrucks`} />
      </svg>
      <nav>
        <ul className={s.navList}>
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? s.activeLink : s.link)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/catalog"
              className={({ isActive }) => (isActive ? s.activeLink : s.link)}
              end
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
