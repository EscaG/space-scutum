import {Box, Pagination, Typography} from "@mui/material";

interface TablePaginationProps {
	page: number;
	totalCount: number;
	totalPages: number;
	handlePageChange: (value: number) => void;
}

export const TablePagination = (props: TablePaginationProps) => {
	const {
		page,
		totalCount,
		totalPages,
		handlePageChange
	} = props;

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				flexDirection: {xs: 'column', sm: 'row'},
				gap: 2,
			}}
		>
			<Typography variant="body2"> Total items: {totalCount}</Typography>
			<Pagination
				count={totalPages}
				page={page}
				onChange={(_, value) => handlePageChange(value)}
				showFirstButton
				showLastButton
			/>
		</Box>
	);
};
