import React from "react";
import ThemeToggleItem from "./ThemeToggleItem.tsx";
import { useTheme } from "../../context";

const options = [
  { label: "Dark", value: "dark" },
  { label: "Light", value: "light" },
  { label: "System", value: "system" }
];

const ThemeToggleMenu = () => {
  const { theme, setTheme } = useTheme();


  function handleClick(newTheme: string) {
    if (theme !== newTheme)
      setTheme(newTheme);
  }

  return (
    <ul className="flex flex-col space-y-3 p-4 bg-background rounded-lg shadow-md">
      {options.map(opt => <ThemeToggleItem key={opt.label} value={opt.value}
                                           onClick={handleClick}>{opt.label}</ThemeToggleItem>)}
    </ul>
  );
};

export default ThemeToggleMenu;