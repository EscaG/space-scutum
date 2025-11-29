import {Box, Button} from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import {useContext} from "react";
import {ThemeContext} from "@app/providers/theme/ThemeContext.tsx";

export const ThemeSwitcher = () => {
	const {mode, setMode} = useContext(ThemeContext);
	const toggleTheme = () => setMode(mode === "light" ? "dark" : "light");

	return (
		<Box>
			<Button
				variant="contained"
				onClick={toggleTheme}
				startIcon={mode === "light" ? <DarkModeIcon/> : <LightModeIcon/>}
			>
				{mode === "light" ? "light" : "dark"}
			</Button>
		</Box>
	);
};
