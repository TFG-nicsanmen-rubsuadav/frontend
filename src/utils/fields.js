export function getRegisterFields(
  name,
  lastName,
  email,
  password,
  phone,
  birthDate,
  onInputChange
) {
  return [
    {
      type: "text",
      placeholder: "Carlos",
      label: "Nombre",
      name: "name",
      value: name,
      onChange: (e) => onInputChange(e),
    },
    {
      type: "text",
      placeholder: "Müller",
      label: "Apellidos",
      name: "lastName",
      value: lastName,
      onChange: (e) => onInputChange(e),
    },
    {
      type: "text",
      placeholder: "Restaurante Rosa Luxemburgo",
      label: "Nombre del local",
      name: "localName",
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
}
