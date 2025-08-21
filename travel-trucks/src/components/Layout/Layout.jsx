import { Outlet, useLocation } from "react-router-dom";
import Header from "../Header/Header";

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <div>
      <Header />
      <main className={isHome ? "" : "container"}>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
