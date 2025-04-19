import { Link } from "react-router-dom";
import { LinkButton } from "../Button";

const NavActions = () => {
  return (
    <ul className="flex items-center gap-4">
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
