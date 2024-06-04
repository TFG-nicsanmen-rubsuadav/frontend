import logo from "../assets/logo-yellow.png";
import { useAuthContext } from "../context/useAuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated } = useAuthContext();
  const role = localStorage.getItem("role");
  let buttons;

  function handleLogout() {
    localStorage.clear();
    window.location.reload();
  }

  if (!role && !isAuthenticated) {
    buttons = (
      <div className="container text-base justify-end">
        <button className="inline-flex items-center bg-green-button border-0 py-3 px-3 mx-4 focus:outline-none hover:bg-hover-button active:bg-active-button rounded text-base font-semibold md:mt-0">
          <Link to="/login">Iniciar sesión</Link>
        </button>
        <button className="inline-flex items-center bg-green-button border-0 py-3 px-3 mx-4 focus:outline-none hover:bg-hover-button active:bg-active-button rounded text-base font-semibold md:mt-0">
          <Link to="/registro">Registro</Link>
        </button>
        <button className="inline-flex items-center bg-green-button border-0 py-3 px-3 mx-4 focus:outline-none hover:bg-hover-button active:bg-active-button rounded text-base font-semibold md:mt-0">
          Valoraciones
        </button>
      </div>
    );
  }

  if (isAuthenticated) {
    buttons = (
      <div className="container text-base justify-end">
        {role === "admin" || role === "owner" ? (
          <button className="inline-flex items-center bg-green-button border-0 py-3 px-3 mx-4 focus:outline-none hover:bg-hover-button active:bg-active-button rounded text-base font-semibold md:mt-0">
            <Link to="/dashboard">Dashboard</Link>
          </button>
        ) : null}
        <button
          className="inline-flex items-center bg-green-button border-0 py-3 px-3 mx-4 focus:outline-none hover:bg-hover-button active:bg-active-button rounded text-base font-semibold md:mt-0"
          onClick={handleLogout}
        >
          Cerrar sesión
        </button>
        <button className="inline-flex items-center bg-green-button border-0 py-3 px-3 mx-4 focus:outline-none hover:bg-hover-button active:bg-active-button rounded text-base font-semibold md:mt-0">
          Valoraciones
        </button>
      </div>
    );
  }

  return (
    <header className="text-white body-font bg-primary-green flex justify-between">
      <div className="mx-5 flex p-2 items-center">
        <Link
          className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          to={"/"}
        >
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </Link>
      </div>
      <div className="mx-5 flex p-2 items-center">
        <nav className="md:ml-4 md:py-1 md:pl-4 text-base">{buttons}</nav>
      </div>
    </header>
  );
}
