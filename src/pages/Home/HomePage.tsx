import {type ChangeEvent, useEffect} from "react";
import {
	Button,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Checkbox,
	Typography,
	Pagination,
	Stack,
	Select,
	MenuItem,
	FormControl,
	InputLabel, type SelectChangeEvent, LinearProgress, Box,
} from "@mui/material";
import {useAppDispatch} from "@app/providers/store";
import {
	selectAllOnPage,
	setLimit,
	setPage,
	toggleSelect,
} from "@/entites/todos/model/todoSlice.ts";
import {useSelector} from "react-redux";
import type {RootState} from "@app/providers/store/config/store.ts";
import type {Todo} from "@/entites/todos/model/types.ts";
import {deleteSelectedTodos, fetchTodos} from "@/entites/todos/model/todosThunks.ts";

export const HomePage = () => {
	const dispatch = useAppDispatch();
	const {
		todos,
		selectedIds,
		page,
		limit,
		totalCount,
		totalPages,
		loading,
	} = useSelector((state: RootState) => state.todos);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch, page, limit]);

	const handleSelectOne = (id: number) => {
		dispatch(toggleSelect(id));
	};

	const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(selectAllOnPage(event.target.checked));
	};

	const handlePageChange = (value: number) => {
		dispatch(setPage(value));
	};

	const handleLimitChange = (event: SelectChangeEvent<number>) => {
		const newLimit = event.target.value;
		dispatch(setLimit(newLimit));
	};
	const handleDeleteSelected = () => {
		dispatch(deleteSelectedTodos());
	};

	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={2} alignItems="center">
				<Button
					variant="contained"
					color="error"
					onClick={handleDeleteSelected}
					disabled={selectedIds.length === 0}
				>
					Delete Selected
				</Button>
				<Button variant="contained" color="primary">Create Todo</Button>
				<FormControl size="small">
					<InputLabel id="select-limit-label">Rows</InputLabel>
					<Select labelId="select-limit-label" value={limit} onChange={handleLimitChange}>
						{[5, 10, 20, 50].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
					</Select>
				</FormControl>
			</Stack>

			<TableContainer component={Paper}>
				{loading && <LinearProgress/>}
				<Table>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									checked={selectedIds.length === todos.length && todos.length > 0}
									indeterminate={selectedIds.length > 0 && selectedIds.length < todos.length}
									onChange={handleSelectAll}
								/>
							</TableCell>
							<TableCell>ID</TableCell>
							<TableCell>Title</TableCell>
							<TableCell>Status</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{todos.map((todo: Todo) => (
							<TableRow key={todo.id} hover>
								<TableCell padding="checkbox">
									<Checkbox checked={selectedIds.includes(todo.id)} onChange={() => handleSelectOne(todo.id)}/>
								</TableCell>
								<TableCell>{todo.id}</TableCell>
								<TableCell>{todo.title}</TableCell>
								<TableCell>{todo.completed
									? <Typography sx={{color: 'success.main'}}>Done</Typography>
									: <Typography sx={{color: 'warning.main'}}>Pending</Typography>
								}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

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
		</Stack>
	);
};
