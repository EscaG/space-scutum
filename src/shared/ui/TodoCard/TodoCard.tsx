import {Card, CardContent, CardHeader, Typography, Chip, Stack, Button} from '@mui/material';
import {CheckCircleOutline, HourglassEmpty} from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import type {Todo} from "@/entites/todos/model/types.ts";
import {deleteTodo} from "@/entites/todos/model/todosThunks.ts";
import {useAppDispatch} from "@app/providers/store";
import {useNavigate} from "react-router-dom";

interface TodoCardProps {
	todo: Todo;
}

//  A todo card is used to display all the information on a todo page.
export const TodoCard = ({todo}: TodoCardProps) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleDeleteSelected = () => {
		dispatch(deleteTodo(todo.id));
		navigate('/');
	};

	return (
		<Card
			variant="outlined"
			sx={{
				maxWidth: 400,
				margin: '16px auto',
				borderRadius: 2,
				boxShadow: 3,
				position: 'relative',
			}}
		>
			<CardHeader
				title={`Todo #${todo.id}`}
				subheader={`User ID: ${todo.userId}`}
				sx={{pb: 0}}
			/>
			<Button
				startIcon={<DeleteIcon/>}
				onClick={handleDeleteSelected}
				sx={{
					color: 'error.main',
					position: 'absolute',
					right: '16px',
					top: '16px',
					zIndex: 1,
					minWidth: 'auto',
					'& .MuiButton-startIcon': {
						margin: 0,
					},
					borderRadius: '50%',
					padding: "8px",
				}}
			/>
			<CardContent sx={{pt: 1}}>
				<Typography
					variant="h6"
					component="div"
					sx={{
						mb: 2,
						wordBreak: 'break-word',
					}}
				>
					{todo.title}
				</Typography>
				<Stack direction="row" spacing={1}>
					{todo.completed ? (
						<Chip
							label="Completed"
							color="success"
							icon={<CheckCircleOutline/>}
							variant="outlined"
						/>
					) : (
						<Chip
							label="Pending"
							color="warning"
							icon={<HourglassEmpty/>}
							variant="outlined"
						/>
					)}
				</Stack>
			</CardContent>
		</Card>
	);
};
