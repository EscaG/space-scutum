import {Box, Button, Container, Link, Paper, Typography} from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';

export const NotFoundPage = () => {

	return (
		<Container
			maxWidth="sm"
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				py: 6,
			}}
		>
			<Paper
				sx={{
					width: 1,
					maxWidth: 480,
					p: 4,
					borderRadius: 2,
					boxShadow: 3,
					textAlign: 'center',
				}}
			>
				<Box
					sx={{
						mx: 'auto',
						mb: 2,
						width: 80,
						height: 80,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: '50%',
					}}
				>
					<WarningIcon
						sx={{width: 48, height: 48}}
						color="error"
					/>
				</Box>

				{/* 404 text */}
				<Typography variant="h3" component="div" gutterBottom sx={{fontWeight: 'bold'}}>
					404
				</Typography>

				<Typography variant="h5" component="h1" gutterBottom>
					Not Found
				</Typography>

				<Typography variant="body1" color="text.secondary">
					The page you are looking for does not exist or has been moved.
				</Typography>

				{/* Back‑to‑home button */}
				<Button
					component={Link}
					href={`/`}
					variant="contained"
					sx={{mt: 2}}
				>
					Back to Home
				</Button>
			</Paper>
		</Container>
	);
};
