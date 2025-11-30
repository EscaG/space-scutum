import {Button} from "@mui/material";
import {type ReactNode} from "react";

interface IconButtonProps {
	color: string;
	icon: ReactNode;
	onClick?: () => void;
}

// Customized button with icon
export const IconButton = (props: IconButtonProps) => {
	const {color, icon, onClick} = props;

	return (
		<Button
			startIcon={icon}
			onClick={onClick}
			sx={{
				color: color,
				minWidth: 'auto',
				'& .MuiButton-startIcon': {
					margin: 0,
				},
				borderRadius: '50%',
				padding: "8px",
			}}
		/>
	)
}
