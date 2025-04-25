import React, { ReactNode } from "react";

const ThemeToggleItem = ({ children }: { children: ReactNode }) => {
  return (
    <li className="px-2 py-1 bg-">
      {children}
    </li>
  );
};

export default ThemeToggleItem;