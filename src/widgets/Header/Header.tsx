import {Link as RouterLink} from "react-router-dom";
import {AppBar, Box, Container, Link} from "@mui/material";
import {ThemeSwitcher} from "../ThemeSwitcher/ThemeSwitcher.tsx";

export const Header = () => (
	<AppBar
		position="sticky"
		color="default"
		elevation={0}
		sx={{borderBottom: 1, borderColor: 'divider'}}
	>
		<Container>
			<Box
				sx={{
					p: {xs: 1, sm: 2},
					display: 'flex',
					justifyContent: 'space-between',
					gap: 3,
					alignItems: 'center',
				}}
			>
				<Link
					component={RouterLink}
					underline="none"
					to="/"
					sx={{
						fontSize: '1.5rem',
						fontWeight: 'bold',
						color: 'text.primary',
					}}
				>
					ToDo
				</Link>
				<ThemeSwitcher/>

			</Box>
		</Container>
	</AppBar>
);
