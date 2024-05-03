import { Button } from "../components/button";

const Default = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    variant: "primary",
    size: "medium",
    children: "Pulsa aquí",
    onclick: () => alert("¡Hola!"),
  },
};

export default Default;

export const Secondary = {
  ...Default,
  args: {
    variant: "primary",
  },
};
