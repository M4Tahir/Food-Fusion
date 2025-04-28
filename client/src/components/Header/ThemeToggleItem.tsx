import React, { ReactNode } from "react";

const ThemeToggleItem = ({ children, value, onClick }: {
  children: ReactNode;
  value: string;
  // onClick: (e: MouseEvent<HTMLLIElement>) => void // because MouseEvent alone is the browser's native event type (Window.MouseEvent), and that one is not generic.
  // React wraps the browser events in its own system (called SyntheticEvent) to work correctly across browsers.
  onClick: (newTheme: string) => void
}) => {
  return (
    <li
      className="px-8 py-2 rounded-md bg-surface hover:bg-hover cursor-pointer flex items-center justify-start border border-transparent hover:border-border transition-all duration-300 ease-out"
      value={value}
      onClick={() => onClick(value)}
    >
      {children}
    </li>
  );
};

export default ThemeToggleItem;