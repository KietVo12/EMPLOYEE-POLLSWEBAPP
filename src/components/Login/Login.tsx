import {
	Accordion,
	AccordionActions,
	AccordionSummary,
	Alert,
	Avatar,
	Button,
	Snackbar,
	Stack,
	TextField,
	Tooltip,
	Typography,
	Box,
} from "@mui/material";
import { FormEvent, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LoginIcon from "@mui/icons-material/Login";
import { Navigate } from "react-router-dom";
import { isSessionActive, sessionActions } from "../../redux/session";
import { useAppDispatch, useAppSelector as select } from "../../redux/store";
import { getUsers } from "../../redux/users";
import { homeProps } from "../../config/sections";
import { motion } from "framer-motion";

export const Login: React.FunctionComponent = () => {
	const [expanded, setExpanded] = useState<string | false>(false);
	const [submittedBlankPassword, setSubmittedBlankPassword] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const dispatch = useAppDispatch();
	const queryParams = new URLSearchParams(window.location.search);
	const redirect = queryParams.get("redirect");
	const users = select(getUsers());
	const sessionActive = select(isSessionActive());

	const handleAccordionChange =
		(panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
			setExpanded(isExpanded ? panel : false);
		};

	const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (!event.currentTarget.password.value) setSubmittedBlankPassword(true);
		const login = dispatch(
			sessionActions.login({
				id: event.currentTarget.username.value,
				password: event.currentTarget.password.value,
			})
		);
		login.unwrap().catch((error) => setErrorMessage(error));
	};

	if (sessionActive) {
		return <Navigate to={redirect || homeProps.path}></Navigate>;
	}

	return (
		<Stack
			direction="column"
			alignItems="center"
			spacing={4}
			sx={{
				padding: 4,
				background: "linear-gradient(135deg, #1976d2, #4caf50)",
				minHeight: "100vh",
				justifyContent: "center",
				color: "#fff",
			}}
		>
			<motion.div
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1 }}
			>
				<Typography
					variant="h3"
					sx={{
						fontWeight: "bold",
						marginBottom: 4,
						textTransform: "uppercase",
					}}
				>
					Login with employee-polls app
				</Typography>
			</motion.div>

			<Stack
				direction="column"
				spacing={2}
				sx={{
					width: "100%",
					maxWidth: "500px",
					backgroundColor: "#fff",
					padding: 3,
					borderRadius: 2,
					boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
				}}
			>
				{users &&
					users.map((user) => (
						<motion.div
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.1 * users.indexOf(user) }}
							key={user.id}
						>
							<Accordion
								expanded={expanded === user.id}
								onChange={handleAccordionChange(user.id)}
								sx={{
									backgroundColor: "#f9f9f9",
									border: "1px solid #ddd",
									borderRadius: 2,
									overflow: "hidden",
									marginBottom: 2,
									"&:hover": {
										boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
									},
								}}
							>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									sx={{ alignItems: "center" }}
								>
									<Stack direction="row" spacing={2} alignItems="center">
										<Avatar
											src={user.avatarURL}
											sx={{
												width: 48,
												height: 48,
												transition: "0.3s",
												"&:hover": { transform: "scale(1.1)" },
											}}
										/>
										<Typography
											variant="h6"
											sx={{
												fontWeight: "bold",
												color: "#333",
												transition: "color 0.3s",
												"&:hover": { color: "#1976d2" },
											}}
										>
											{user.name}
										</Typography>
									</Stack>
								</AccordionSummary>
								<form id={user.id} onSubmit={handleOnSubmit}>
									<AccordionActions
										sx={{
											flexDirection: "column",
											gap: 2,
											padding: 2,
										}}
									>
										<input
											readOnly
											type="text"
											name="username"
											autoComplete="username"
											value={user.id}
											className="hidden"
										/>
										<TextField
											autoComplete="current-password"
											label="Password"
											type="password"
											name="password"
											variant="outlined"
											fullWidth
										/>
										<Button
											type="submit"
											variant="contained"
											color="primary"
											startIcon={<LoginIcon />}
											fullWidth
											sx={{
												textTransform: "none",
												fontWeight: "bold",
												background: "linear-gradient(135deg, #1976d2, #4caf50)",
												boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
												"&:hover": {
													background: "linear-gradient(135deg, #4caf50, #1976d2)",
												},
											}}
										>
											Login
										</Button>
									</AccordionActions>
								</form>
							</Accordion>
						</motion.div>
					))}
			</Stack>

			<Box>
				<Snackbar
					open={errorMessage !== null}
					autoHideDuration={3000}
					onClose={() => setErrorMessage(null)}
				>
					<Alert severity="error">{errorMessage}</Alert>
				</Snackbar>
				<Snackbar
					open={submittedBlankPassword}
					autoHideDuration={3000}
					onClose={() => setSubmittedBlankPassword(false)}
				>
					<Alert severity="warning">Password cannot be blank</Alert>
				</Snackbar>
			</Box>
		</Stack>
	);
};

export default Login;
