import {Button, type ButtonProps} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const EditButton = ({onClick}: ButtonProps) => {
	return (
		<Button
			startIcon={<EditIcon/>}
			onClick={onClick}
			sx={{
				color: 'text.primary',
				minWidth: 'auto',
				'& .MuiButton-startIcon': {
					margin: 0,
				},
				borderRadius: '50%',
				padding: "8px",
			}}
		/>
	);
};
