import React, { createContext, ReactNode, useContext, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage.ts";

type Theme = string | "light" | "dark" | "system";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeLocalStorage] = useLocalStorage<string>("theme", "system");

  useEffect(() => {
    if (theme === "system") {
      const prefDark = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", prefDark);
    } else
      document.documentElement.setAttribute("data-theme", theme);

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeLocalStorage }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};

export { ThemeProvider, useTheme };