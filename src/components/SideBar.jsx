import { useState } from "react";

import logo from "../assets/logo-yellow.png";
import {
  Cog6ToothIcon,
  PencilSquareIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";

export default function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className="bg-primary-green h-screen w-56 flex flex-col items-center justify-between">
      <div className="flex flex-col items-center w-52 justify-between mt-5">
        <img src={logo} alt="logo" className="w-20 h-20" />
        <h3 className="text-white text-lg font-bold mt-2">Bienvenido, user</h3>

        <button className="flex items-center my-20 mb-5 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button">
          <ChartBarSquareIcon className="h-6 w-6 text-white mr-2" />
          <span className="text-white">Dashboard</span>
        </button>

        <button className="flex items-center my-6 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button">
          <PencilSquareIcon className="h-6 w-6 text-white mr-2" />
          <span className="text-white">Cartas/Menus</span>
        </button>

        <button className="flex items-center my-6 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button">
          <Cog6ToothIcon className="h-6 w-6 text-white mr-2" />
          <span className="text-white">Ajustes</span>
        </button>
      </div>
    </div>
  );
}
