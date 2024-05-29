import { Bars3Icon } from "@heroicons/react/24/outline";
import logo from "../assets/logo-yellow.png";

export default function HamburgerMenu({ setIsOpen }) {
  return (
    <div
      className="hamburger-component p-2 bg-primary-green space-y-2 flex justify-between items-center"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <Bars3Icon className="h-6 w-6 text-white" />
      <img src={logo} alt="logo" className="w-16 h-16 mx-auto" />
    </div>
  );
}
