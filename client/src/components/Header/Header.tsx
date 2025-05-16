import { Link } from "react-router";
import { NavBar } from "./index.ts";
import { Logo } from "../index.ts";

const Header = () => {
  return (
    <header className="header grid grid-cols-[auto_1fr] items-center gap-6 px-4 py-2 z-[100]">
      <Link to="/">
        <Logo width="64px" height="64px" />
      </Link>
      <NavBar />
    </header>
  );
};

export default Header;
