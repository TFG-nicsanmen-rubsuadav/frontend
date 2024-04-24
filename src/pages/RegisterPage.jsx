import Input from "../components/Input";
import Button from "../components/Button";
import logo from "../assets/logo-green.png";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const fields = [
    { type: "text", placeholder: "Carlos Müller", label: "Nombre y apellidos" },
    {
      type: "text",
      placeholder: "Restaurante Rosa Luxemburgo",
      label: "Nombre del local",
    },
    {
      type: "text",
      placeholder: "rosa-luxemburgo",
      label: "URL personalizada",
      staticPrefix: "goodmenu.com/",
    },
    {
      type: "email",
      placeholder: "cmuller@us.es",
      label: "Correo electrónico",
    },
    {
      type: "password",
      placeholder: "Utilice una combinación de al menos 6 letras y números",
      label: "Contraseña",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-start pt-20 h-screen bg-primary-green overflow-auto pb-20">
      <div className="flex flex-col items-center justify-center py-4 px-32 bg-white rounded-lg">
        <img src={logo} alt="Logo" className="w-36 h-36 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Crea tu cuenta</h1>
        <h3 className="text-sm text-gray-500 mb-8">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-primary-green font-bold">
            Inicia sesión
          </Link>
        </h3>
        <form className="flex flex-col items-center justify-center p-4 w-full lg:w-1/2">
          {fields.map((field, index) => (
            <Input
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              label={field.label}
              staticPrefix={field.staticPrefix}
              className="w-full lg:w-3/4"
            />
          ))}
          <div className="flex justify-center mt-4 w-full lg:w-3/4">
            <Button text="Registrarse" className="w-full" color="green" />
          </div>
        </form>
      </div>
    </div>
  );
}
