import { Box, CircularProgress, Typography } from '@mui/material';

export const LoadingSpinner = ({ message = 'Loading...' }: { message?: string }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				minHeight: '50vh',
				gap: 2,
			}}
		>
			<CircularProgress color="primary" size={60} thickness={5} />
			<Typography variant="subtitle1" color="textSecondary">
				{message}
			</Typography>
		</Box>
	);
};

