import { useState } from "react";
import { Link } from "react-router-dom";

// local imports
import { fetchRegister } from "../api/endpoints";
import Input from "../components/Input";
import Button from "../components/Button";
import logo from "../assets/logo-green.png";
import { getRegisterFields } from "../utils/fields";
import { formatBirthDate } from "../utils/helpers";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    rol: "",
  });

  const [errors, setErrors] = useState("");

  const { name, lastName, email, password, phone, birthDate, rol } = form;

  function onInputChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors("");
  }

  async function onSubmit(e) {
    e.preventDefault();

    const { status, data } = await fetchRegister(formatBirthDate(form));

    switch (status) {
      case 201:
        if (rol === "owner") {
          localStorage.setItem("sessionId", data.sessionId);
          const url = localStorage.getItem("sessionId");
          window.location.replace(url);
        }
        break;
      case 400:
        setErrors(
          data.nameError ||
            data.lastNameError ||
            data.emailError ||
            data.passwordError ||
            data.phoneError ||
            data.birthDateError ||
            data.rol ||
            data.email
        );
        break;
    }
  }

  const fields = getRegisterFields(
    name,
    lastName,
    email,
    password,
    phone,
    birthDate,
    onInputChange
  );
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
              staticPrefix={field.staticPrefix}
              className="w-full lg:w-3/4"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
            />
          ))}
          <select
            name="rol"
            value={rol}
            id="rol"
            className="flex items-center border p-2 rounded-lg w-full md:w-[450px] h-[40px] bg-bg-custom text-md bg-transparent text-gray-custom outline-0"
            onChange={(e) => onInputChange(e)}
          >
            <option defaultValue>Seleccione un rol</option>
            <option value="owner">Dueño</option>
            <option value="customer">Cliente</option>
          </select>
          {errors && (
            <div className="flex flex-col items-center justify-center w-full lg:w-3/4">
              <span className="text-red-500 text-sm">{errors}</span>
            </div>
          )}
          <div className="flex justify-center mt-4 w-full lg:w-3/4">
            <Button
              text="Registrarse"
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
