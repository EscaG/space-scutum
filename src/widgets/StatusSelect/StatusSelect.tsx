import {useState} from 'react';
import {
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Typography,
	type SelectChangeEvent,
} from '@mui/material';
import type {Todo} from "@/entites/todos/model/types.ts";
import {useAppDispatch} from "@app/providers/store";
import {updateTodo} from "@/entites/todos/model/todosThunks.ts";

interface StatusSelectProps {
	todo: Todo;
}

export const StatusSelect = ({todo}: StatusSelectProps) => {
	const dispatch = useAppDispatch();
	const [completed, setCompleted] = useState(todo.completed);

	const handleChange = (event: SelectChangeEvent<string>) => {
		const newCompleted = event.target.value === 'Done';
		setCompleted(newCompleted);
		dispatch(updateTodo({id: todo.id, data: {...todo, completed: newCompleted}}));
	};

	return (
		<FormControl fullWidth size="small">
			<InputLabel>Progress</InputLabel>
			<Select value={completed ? "Done" : "Pending"} label="Completed" onChange={handleChange}>
				<MenuItem value={"Pending"}>
					<Typography sx={{color: 'warning.main'}}>Pending</Typography>
				</MenuItem>
				<MenuItem value={"Done"}>
					<Typography sx={{color: 'success.main'}}>Done</Typography>
				</MenuItem>
			</Select>
		</FormControl>
	);
};

