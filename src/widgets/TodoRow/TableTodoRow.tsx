import {Box, Checkbox, TableCell, TableRow, TextField} from "@mui/material";
import {IconButton} from "@shared/ui/IconButton/IconButton.tsx";
import {StatusSelect} from "@widgets/StatusSelect/StatusSelect.tsx";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import type {Todo} from "@/entites/todos/model/types.ts";
import {type ChangeEvent, memo, useState} from "react";
import {deleteTemporaryTodo, toggleSelect} from "@/entites/todos/model/todoSlice.ts";
import {useAppDispatch} from "@app/providers/store";
import {useNavigate} from "react-router-dom";
import {createTodo, updateTodo} from "@/entites/todos/model/todosThunks.ts";

interface TodoRowProps {
	todo: Todo;
	selectedIds: number[];
}

// Memoizing a component to prevent unnecessary re-rendering
export const TableTodoRow = memo((props: TodoRowProps) => {
	const {
		todo,
		selectedIds,
	} = props;
	const [isEditing, setIsEditing] = useState<boolean>(todo.isNew ?? false);
	const [value, setValue] = useState<string>(todo.title ?? "");
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleSelectOne = (id: number) => {
		dispatch(toggleSelect(id));
	};

	const handleOpenTodoById = (id: number) => {
		if (!isEditing && !todo?.isNew) {
			navigate(`/todo/${id}`);
		}
	};

	const handleEditTodoOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setValue(e.target.value);
	};

	const handleSaveEditing = async (id: number) => {
		try {
			if (todo?.isNew) {
				await dispatch(createTodo({...todo, title: value, isNew: false}));
				dispatch(deleteTemporaryTodo(todo.id));
			} else {
				await dispatch(updateTodo({id, data: {...todo, title: value}}));
			}
		} finally {
			setIsEditing(false);
		}
	};

	const handleCancelEditing = () => {
		if (todo?.isNew) {
			dispatch(deleteTemporaryTodo(todo.id));
		} else {
			setValue(todo.title);
		}
		setIsEditing(false);
	};

	const handleEditTodo = () => {
		setIsEditing(true);
	};

	return (
		<TableRow hover sx={{cursor: "pointer"}}>
			<TableCell padding="checkbox">
				<Checkbox checked={selectedIds.includes(todo.id)} onChange={() => handleSelectOne(todo.id)}/>
			</TableCell>
			<TableCell>{todo?.isNew ? 0 : todo.id}</TableCell>
			<TableCell onClick={() => handleOpenTodoById(todo.id)}>
				{isEditing || todo?.isNew
					? <Box display={"flex"} gap={1}>
						<TextField
							value={value ?? todo.title}
							onChange={handleEditTodoOnChange}
							sx={{width: "100%"}}
							size="small"
						/>
						<IconButton
							icon={<DoneIcon/>}
							onClick={() => handleSaveEditing(todo.id)}
							color="success.main"
						/>
					</Box>
					: todo.title
				}
			</TableCell>
			<TableCell>
				<StatusSelect todo={todo}/>
			</TableCell>
			<TableCell sx={{textAlign: "center"}}>
				{isEditing || todo?.isNew
					? <IconButton
						icon={<CancelIcon/>}
						onClick={handleCancelEditing}
						color="error.main"
					/>
					: <IconButton
						onClick={handleEditTodo}
						color="text.primary"
						icon={<EditIcon/>}
					/>
				}
			</TableCell>
		</TableRow>
	);
});
