import {createTheme, type Theme} from "@mui/material/styles";
import type {ThemeMode} from "@shared/types/ui.ts";
/**
 * Design tokens for the light and dark themes.
 */

const light = {
	// Primary fill colors
	background: {
		default: "#ffffff",
		paper: "#F7F7F8",
	},
	// Borders and separators
	divider: "#E5E7EB",
};

const dark = {
	// Primary fill colors
	background: {
		default: "#1A1A1A",
		paper: "#212121",
	},
	// Borders and separators
	divider: "#333333",
};

type ThemeType = {
	theme: Theme;
}

export const getDesignTokens = (mode: ThemeMode) => ({
	palette: {
		mode,
		...(mode === "light" ? light : dark),
	},
	components: {
		MuiTableHead: {
			styleOverrides: {
				// Minor color correction in the header
				root: ({theme}: ThemeType) => ({
					backgroundColor:
						theme.palette.mode === 'light'
							? theme.palette.grey[200]
							: theme.palette.grey[900],
				}),
			},
		},
		MuiTableCell: {
			styleOverrides: {
				// Changing indents and font size in a table
				root: ({ theme }: ThemeType) => ({
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					padding: '12px',

					[theme.breakpoints.down('sm')]: {
						padding: '4px',
						maxWidth: 150,
					},

					[theme.breakpoints.down('md')]: {
						padding: '8px',
					},
				}),
				head: ({ theme }: ThemeType) => ({
					fontSize: theme.typography.pxToRem(18),
					fontWeight: 600,
					[theme.breakpoints.down('sm')]: {
						fontSize: theme.typography.pxToRem(12),
					},

					[theme.breakpoints.down('md')]: {
						fontSize: theme.typography.pxToRem(14),
					},
				}),

			},
		},
		MuiTextField: {
			styleOverrides: {
				root: ({ theme } : ThemeType) => ({
					// Changing the background color of an input
					'& .MuiInputBase-root': {
						backgroundColor:
							theme.palette.mode === 'light'
								? theme.palette.grey[200]   // светлый фон
								: theme.palette.grey[700], // тёмный фон
						borderRadius: theme.shape.borderRadius,
					},
				}),
			},
		},
	}
});

export const createAppTheme = (mode: ThemeMode) =>
	createTheme(getDesignTokens(mode));



