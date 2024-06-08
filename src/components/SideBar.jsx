import { useEffect, useState } from "react";
import {
  Cog6ToothIcon,
  PencilSquareIcon,
  ChartBarSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

// local imports
import HamburgerMenu from "./HamburgerMenu";
import logo from "../assets/logo-yellow.png";
import { fetchUser } from "../api/endpoints";

export default function SideBar({ restaurantId, openModal }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({});

  async function getUser() {
    const user = await fetchUser(localStorage.getItem("userId"));
    setUser(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {isOpen ? (
        <div className="lg:hidden">
          <div className="bg-primary-green h-screen w-56 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center w-52 justify-between mt-5">
              <div className="XMarkIcon">
                <XMarkIcon
                  className="h-6 w-6 text-white cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </div>
              <div className="flex justify-center w-full">
                <Link to="/">
                  <img src={logo} alt="logo" className="w-20 h-20" />
                </Link>
              </div>
              <h3 className="text-white text-lg font-bold mt-2">
                Bienvenido, {user.name}
              </h3>
              <>
                <button className="flex items-center my-20 mb-5 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button">
                  <ChartBarSquareIcon className="h-6 w-6 text-white mr-2" />
                  <span className="text-white">Dashboard</span>
                </button>

                <button className="flex items-center my-6 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button">
                  <PencilSquareIcon className="h-6 w-6 text-white mr-2" />
                  <Link to={`/${restaurantId}/menu`}>
                    <span className="text-white">Cartas/Menus</span>
                  </Link>
                </button>

                <button
                  onClick={() => openModal()}
                  className="flex items-center my-6 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button"
                >
                  <Cog6ToothIcon className="h-6 w-6 text-white mr-2" />
                  <span className="text-white">Ajustes</span>
                </button>
              </>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:hidden">
          <HamburgerMenu setIsOpen={setIsOpen} />
        </div>
      )}

      <div className="hidden lg:block">
        <div className="bg-primary-green h-screen w-56 flex flex-col items-center justify-between">
          <div className="flex flex-col items-center w-52 justify-between mt-5">
            <Link to="/">
              <img src={logo} alt="logo" className="w-20 h-20" />
            </Link>
            <h3 className="text-white text-lg font-bold mt-2">
              Bienvenido, {user.name}
            </h3>
            <>
              <button className="flex items-center my-20 mb-5 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button">
                <ChartBarSquareIcon className="h-6 w-6 text-white mr-2" />
                <span className="text-white">Dashboard</span>
              </button>

              <button className="flex items-center my-6 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button">
                <PencilSquareIcon className="h-6 w-6 text-white mr-2" />
                <Link to={`/${restaurantId}/menu`}>
                  <span className="text-white">Cartas/Menus</span>
                </Link>
              </button>

              <button
                onClick={() => openModal()}
                className="flex items-center my-6 w-full p-2 rounded-md justify-center focus:outline-none bg-green-button hover:bg-hover-button active:bg-active-button"
              >
                <Cog6ToothIcon className="h-6 w-6 text-white mr-2" />
                <span className="text-white">Ajustes</span>
              </button>
            </>
          </div>
        </div>
      </div>
    </>
  );
}
