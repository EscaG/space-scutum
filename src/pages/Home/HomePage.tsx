import {type ChangeEvent, useEffect} from "react";
import {useSelector} from "react-redux";
import {
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	LinearProgress,
	MenuItem,
	Paper,
	Select,
	type SelectChangeEvent,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import {useAppDispatch} from "@app/providers/store";
import {addEmptyTemporaryTodo, selectAllOnPage, setLimit, setPage} from "@/entites/todos/model/todoSlice.ts";
import type {RootState} from "@app/providers/store/config/store.ts";
import type {Todo} from "@/entites/todos/model/types.ts";
import {deleteSelectedTodos, fetchTodos} from "@/entites/todos/model/todosThunks.ts";
import {TablePagination} from "@widgets/Pagination/TablePagination.tsx";
import {TableTodoRow} from "@widgets/TodoRow/TableTodoRow.tsx";

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

	const handleCreateTodo = () => {
		dispatch(addEmptyTemporaryTodo());
	};

	return (
		<Stack spacing={2}>
			<Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
				<FormControl size="small">
					<InputLabel id="select-limit-label">Rows</InputLabel>
					<Select labelId="select-limit-label" value={limit} onChange={handleLimitChange}>
						{[5, 10, 20, 50].map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
					</Select>
				</FormControl>
				<Button
					variant="contained"
					color="error"
					onClick={handleDeleteSelected}
					disabled={selectedIds.length === 0}
				>
					Delete Selected
				</Button>
				<Button
					variant="contained"
					color="primary"
					onClick={handleCreateTodo}
				>
					Create Todo
				</Button>
			</Stack>

			<TableContainer component={Paper} sx={{position: "relative"}}>
				{loading && <LinearProgress sx={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 1}}/>}
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
							<TableCell sx={{textAlign: "center"}}>Edit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{todos.map((todo: Todo) => (
							<TableTodoRow
								todo={todo}
								selectedIds={selectedIds}
								key={todo.id}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				page={page}
				totalCount={totalCount}
				totalPages={totalPages}
				handlePageChange={handlePageChange}
			/>
		</Stack>
	);
};
