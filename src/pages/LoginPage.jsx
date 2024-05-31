import { useState } from "react";
import { Link } from "react-router-dom";

// local imports
import { fetchLogin } from "../api/endpoints";
import Input from "../components/Input";
import Button from "../components/Button";
import logo from "../assets/logo-green.png";
import { useAuthContext } from "../context/useAuthContext";

export default function LoginPage() {
  const { login } = useAuthContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const { email, password } = form;

  function onInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });

    setErrors("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    const { status, data } = await fetchLogin(form);

    switch (status) {
      case 200:
        login(data.token, data.userRole);
        localStorage.setItem("userId", data.userId);
        break;
      case 400:
        setErrors(data.email || data.password || data.credentials);
        break;
      case 404:
        setErrors(data.email);
        break;
    }
  }

  const fields = [
    {
      type: "email",
      placeholder: "cmuller@us.es",
      label: "Correo electrónico",
      name: "email",
      value: email,
      onChange: (e) => onInputChange(e),
    },
    {
      type: "password",
      placeholder: "Utilice una combinación de al menos 6 letras y números",
      label: "Contraseña",
      name: "password",
      value: password,
      onChange: (e) => onInputChange(e),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-start pt-20 h-screen bg-primary-green">
      <div className="flex flex-col items-center justify-center py-4 px-32 bg-white rounded-lg">
        <img src={logo} alt="Logo" className="w-36 h-36 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Inicia sesión</h1>
        <h3 className="text-sm text-gray-500 mb-8">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="text-primary-green font-bold">
            Regístrate
          </Link>
        </h3>
        <form
          className="flex flex-col items-center justify-center p-4 w-full lg:w-1/2"
          onSubmit={(e) => onSubmit(e)}
        >
          {fields.map((field, index) => (
            <Input
              key={index}
              type={field.type}
              placeholder={field.placeholder}
              label={field.label}
              className="w-full lg:w-3/4"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          ))}
          {errors && (
            <div className="flex flex-col items-center justify-center w-full lg:w-3/4">
              <span className="text-red-500 text-sm">{errors}</span>
            </div>
          )}
          <div className="flex justify-center mt-4 w-full lg:w-3/4">
            <Button
              text="Iniciar sesión"
              className="w-full"
              color="green"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
