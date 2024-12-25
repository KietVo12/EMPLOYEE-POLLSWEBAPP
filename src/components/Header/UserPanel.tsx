import { Avatar, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginProps } from "../../config/sections";
import {
	getSession,
	sessionActions,
	isSessionActive,
} from "../../redux/session";
import { useAppDispatch, useAppSelector as select } from "../../redux/store";

export const UserPanel = () => {
	const dispatch = useAppDispatch();
	const session = select(getSession());
	const navigate = useNavigate();
	const sessionActive = select(isSessionActive());

	const logout = () => {
		dispatch(sessionActions.logout());
	};

	const login = () => {
		navigate(loginProps.path);
	};

	const buttonText = session.status === "ACTIVE" ? "Logout" : "Login";

	return (
		<Stack
			direction="row"
			justifyContent="flex-end"
			alignItems="center"
			sx={{ paddingX: 3, gap: 3 }} 
		>
			{session.status === "ACTIVE" && (
				<Stack
					direction="row"
					alignItems="center"
					sx={{ gap: 1 }}
				>
					<Avatar
						src={session.userDetails?.avatarURL}
						sx={{ width: 50, height: 50 }} 
					/>
					<Typography variant="body1" sx={{ fontWeight: "bold" }}>
						{session.userDetails?.name}
					</Typography>
				</Stack>
			)}
			<Button
				color="secondary"
				variant="contained"
				sx={{
					textTransform: "none",
					fontWeight: "bold",
					paddingX: 2,
				}}
				onClick={sessionActive ? logout : login}
			>
				{buttonText}
			</Button>
		</Stack>
	);
};

export default UserPanel;
