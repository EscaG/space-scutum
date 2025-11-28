import {type ReactNode, useState} from "react";
import {ThemeProvider as MuiThemeProvider, CssBaseline} from "@mui/material";
import {ThemeContext} from "./ThemeContext";
import {createAppTheme} from "./theme";
import type {ThemeMode} from "../../../shared/types/ui.ts";

interface Props {
	children: ReactNode;
}

export function ThemeProvider({children}: Props) {
	// 1. LocalStorage
	const stored = localStorage.getItem("themeMode") as ThemeMode | null;

	// 2. System preference
	const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const systemMode: ThemeMode = systemPrefersDark ? "dark" : "light";

	// 3. Initial mode
	const initialMode: ThemeMode = stored || systemMode;

	const [mode, setModeState] = useState<ThemeMode>(initialMode);

	const setMode = (newMode: ThemeMode) => {
		setModeState(newMode);
		localStorage.setItem("themeMode", newMode);
	};

	return (
		<ThemeContext.Provider value={{mode, setMode}}>
			<MuiThemeProvider theme={createAppTheme(mode)}>
				<CssBaseline/>
				{children}
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
}
