import {Outlet} from 'react-router-dom';
import {Header} from "@widgets/Header/Header.tsx";
import {Container} from "@mui/material";

// Main Layout for displaying content with a header
export const MainLayout = () => {
	return (
		<>
			<Header/>
			<Container
				component="main"
				sx={{
					p: { xs: 1, sm: 2 }
				}}
			>
				<Outlet/>
			</Container>
		</>
	);
};
