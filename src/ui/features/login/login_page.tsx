import { FormEvent, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  Paper,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectChangeEvent } from "@mui/material/Select";
import LoginForm from "./components/login_form";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setAuthedUser } from "../../../state/modules/authedUser";
// import { User } from "../../../state/modules/users";
import PageRoutes from "../../../state/types/page_routes";
import LoadingStatus from "../../../state/types/loading_status";

interface LocationState {
  prevRoute: string;
}
export default function Login() {
  const [user, setUser] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const { entities: users, loading } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const { prevRoute: route } = (location.state as LocationState) || {
    prevRoute: PageRoutes.Home,
  };

  const isLoading = loading === LoadingStatus.idle;
  const handleUserChange = (event: SelectChangeEvent) => {
    setUser(event.target.value as string);
    setErrorMessage(undefined);
  };


  const handlePasswordChange = (pw: string) => {
    setPassword(pw);
    setErrorMessage(undefined); 
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user) {
      setErrorMessage("Please select user.");
      return;
    }
    const userObj = users[user];
    if (!userObj) {
      setErrorMessage("User does not exist.");
      return;
    }
    if (password !== userObj.password) {
      setErrorMessage("Incorrect password, please re-enter.");
      return;
    }
    setErrorMessage(undefined);
    dispatch(setAuthedUser(user));
    navigate(route, { replace: true });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg,rgb(22, 234, 96),rgb(114, 198, 149))",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: { xs: 5, md: 8 },
        pb: 6,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          mb: { xs: 3, md: 5 },
          textAlign: "center",
        }}
      >
        Welcome to the Employee-polls App
      </Typography>
      {isLoading && (
        <LinearProgress
          sx={{
            width: { xs: "90%", md: "50%" },
            mb: 2,
          }}
        />
      )}
      <Container
        component={Paper}
        maxWidth="xs"
        sx={{
          borderRadius: 4,
          py: 4,
          px: 3,
          boxShadow: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/user.png" alt="user" width="50px" />
        <Typography variant="h4" mt="10px" sx={{ mb: 3 }}>
          Login
        </Typography>
        <LoginForm
          user={user}
          users={users}
          password={password}
          isLoading={isLoading}
          errorMessage={errorMessage}
          onUserChange={handleUserChange}
          onPasswordChange={handlePasswordChange}
          onSubmit={handleOnSubmit}
        />
      </Container>
    </Box>
  );
}
