import { useState } from "react";

// local imports
import { fetchRegister } from "../api/endpoints";
import Input from "../components/Input";
import Button from "../components/Button";
import logo from "../assets/logo-green.png";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "19/07/1999",
    rol: "",
  });

  const [errors, setErrors] = useState("");

  const { name, lastName, email, password, phone, birthDate, rol } = form;

  function onInputChange(e) {
    let value = e.target.value;

    if (e.target.name === "birthDate") {
      const [year, month, day] = value.split("-");
      value = `${day}/${month}/${year}`;
    }

    setForm({ ...form, [e.target.name]: value });

    //limpiamos los errores
    setErrors("");
  }

  async function onSubmit(e) {
    e.preventDefault();
    const { status, data } = await fetchRegister(form);

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
            data.rol
        );
        break;
    }
  }

  const fields = [
    {
      type: "text",
      placeholder: "Carlos Müller",
      label: "Nombre y apellidos",
      name: "name",
      value: name,
      onChange: (e) => onInputChange(e),
    },
    {
      type: "text",
      placeholder: "Restaurante Rosa Luxemburgo",
      label: "Nombre del local",
      name: "lastName",
      value: lastName,
      onChange: (e) => onInputChange(e),
    },
    // {
    //   type: "text",
    //   placeholder: "rosa-luxemburgo",
    //   label: "URL personalizada",
    //   staticPrefix: "goodmenu.com/",
    // },
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
    {
      type: "tel",
      placeholder: "666555444",
      label: "Teléfono",
      name: "phone",
      value: phone,
      onChange: (e) => onInputChange(e),
    },
    {
      type: "date",
      placeholder: "01/01/2000",
      label: "Fecha de nacimiento",
      name: "birthDate",
      value: birthDate,
      onChange: (e) => onInputChange(e),
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => onInputChange(e)}
          >
            <option selected>Seleccione un rol</option>
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
