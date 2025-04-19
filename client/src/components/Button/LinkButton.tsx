import { ReactNode } from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";

interface LinkButtonProps {
  children: ReactNode;
  to: string;
  type: "primary" | "secondary";
}

const LinkButton = ({ children, to, type }: LinkButtonProps) => {
  const baseStyles =
    "cursor-pointer rounded-md px-6 py-3 transition-all duration-300 border text-sm font-medium";

  const variantStyles =
    type === "primary"
      ? "bg-primary text-white border-primary hover:bg-opacity-80"
      : "border-primary text-primary hover:bg-primary hover:text-white";

  return (
    <Link to={to} className={clsx(baseStyles, variantStyles)}>
      {children}
    </Link>
  );
};

export default LinkButton;
