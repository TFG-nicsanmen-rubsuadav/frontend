import { cva } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
  'font-bold rounded text-sm sm:text-base md:text-base',
  {
    variants: {
      variant: {
        primary: 'bg-primary-green text-white hover:bg-primary-green-hover active:bg-primary-green-active',
        secondary: 'bg-gray-300 text-black',
      },
      size: { small: 'py-1 px-3', medium: 'py-2 px-4', large: 'py-3 px-5' },
    },
    defaultVariant: { variant: 'primary', size: 'medium' },
  }
);

export const Button = ({ variant, size, className, children, ...props }) => (
  <button className={clsx(buttonVariants({variant, size}), className)} {...props} >{children}</button>
);
