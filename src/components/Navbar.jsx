import logo from "../assets/logo-yellow.png";
import { useAuthContext } from "../context/useAuthContext";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, role } = useAuthContext();

  const [currentView, setCurrentView] = useState("menu");

  let buttons;
  switch (currentView) {
    case "menu":
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
      break;
    default:
      buttons = null;
  }

  return (
    <header className="text-white body-font bg-primary-green flex justify-between">
      <div className="mx-5 flex p-2 items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 ">
          <img src={logo} alt="Logo" className="w-20 h-20" />
        </a>
      </div>
      <div className="mx-5 flex p-2 items-center">
        <nav className="md:ml-4 md:py-1 md:pl-4 text-base">{buttons}</nav>
      </div>
    </header>
  );
}
