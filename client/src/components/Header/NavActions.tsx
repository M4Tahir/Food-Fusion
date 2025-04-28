import { LinkButton } from "../Button";
import { ThemeToggle } from "./index.ts";

const NavActions = () => {
  return (
    <ul className="flex items-center gap-4">
      <ThemeToggle />
      <li>
        <LinkButton type="secondary" to="">
          Sign In
        </LinkButton>
      </li>
      <li>
        <LinkButton type="primary" to="">
          Signup
        </LinkButton>
      </li>
    </ul>
  );
};

export default NavActions;
