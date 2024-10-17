import { createContext } from "react";

export interface Theme {
  color: string;
  background: string;
  dark: boolean;
  font: string;
}

const light: Theme = {
  color: "text-gray-900",
  background: "white",
  dark: false,
  font: "sans-serif",
};

const ThemeContext = createContext(light);

export { ThemeContext, light };
