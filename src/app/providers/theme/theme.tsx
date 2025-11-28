import {createTheme} from "@mui/material/styles";
import type {ThemeMode} from "@shared/types/ui.ts";

const light = {
	// Основа
	background: {
		default: "#ffffff",
		paper: "#f7f7f7",
	},
	// Основные цвета
	primary: {
		main: "#1976d2",
		light: "#63a4ff",
		dark: "#004ba0",
		contrastText: "#ffffff",
	},
	secondary: {
		main: "#9c27b0",
		light: "#d05ce3",
		dark: "#6a0080",
		contrastText: "#ffffff",
	},
	// Текст
	text: {
		primary: "#000000",
		secondary: "#555555",
		disabled: "#9e9e9e",
	},
	// Границы и разделители
	divider: "#e0e0e0",
	// Состояния
	action: {
		hover: "rgba(0,0,0,0.04)",
		selected: "rgba(0,0,0,0.08)",
		disabled: "rgba(0,0,0,0.26)",
		disabledBg: "rgba(0,0,0,0.12)",
		active: "rgba(0,0,0,0.54)",
		focus: "rgba(0,0,0,0.12)",
	},
	// Дополнительные поверхности
	customSurfaces: {
		header: "#f3f3f3",
		sidebar: "#efefef",
		card: "#ffffff",
		menu: "#ffffff",
		dialog: "#ffffff",
		footer: "#f5f5f5",
	},
};

const dark = {
	// Основа
	background: {
		default: "#1A1A1A",
		paper: "#212121",
	},
	// Основные цвета
	primary: {
		main: "#90caf9",
		light: "#e3f2fd",
		dark: "#42a5f5",
		contrastText: "#000000",
	},
	secondary: {
		main: "#f48fb1",
		light: "#f8bbd0",
		dark: "#c2185b",
		contrastText: "#000000",
	},
	// Текст
	text: {
		primary: "#ffffff",
		secondary: "#bbbbbb",
		disabled: "#777777",
	},
	// Границы и разделители
	divider: "#333333",
	// Состояния
	action: {
		hover: "rgba(255,255,255,0.08)",
		selected: "rgba(255,255,255,0.16)",
		disabled: "rgba(255,255,255,0.3)",
		disabledBg: "rgba(255,255,255,0.12)",
		active: "rgba(255,255,255,0.7)",
		focus: "rgba(255,255,255,0.12)",
	},
	// Дополнительные поверхности
	customSurfaces: {
		header: "#181818",
		sidebar: "#161616",
		card: "#1c1c1c",
		menu: "#262626",
		dialog: "#202020",
		footer: "#141414",
	},
};

export const getDesignTokens = (mode: ThemeMode) => ({
	palette: {
		mode,
		...(mode === "light" ? light : dark),
	},
});

export const createAppTheme = (mode: ThemeMode) =>
	createTheme(getDesignTokens(mode));



