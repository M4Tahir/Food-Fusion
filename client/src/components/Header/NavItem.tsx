import React, { ReactNode } from "react";
import { NavLink } from "react-router";

interface NavItemProps {
  to: string;
  label: ReactNode;
}

const NavItem = ({ label, to }: NavItemProps) => {
  return (
    <li>
      <NavLink className="nav-item" to={to}>
        {label}
      </NavLink>
    </li>
  );
};

export default NavItem;
