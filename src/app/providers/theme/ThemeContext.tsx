import { createContext } from "react";

export interface ThemeContextType {
	mode: "light" | "dark";
	setMode: (mode: "light" | "dark") => void;
}

export const ThemeContext = createContext<ThemeContextType>({
	mode: "light",
	setMode: () => {},
});
