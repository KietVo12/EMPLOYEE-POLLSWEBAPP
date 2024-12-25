import {
    Box,
    Stack,
    TextField,
    Button,
    Typography,
    Avatar,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector as select } from "../../redux/store";
import { isSessionActive, sessionActions } from "../../redux/session";
import { Navigate } from "react-router-dom";
import { getUsers } from "../../redux/users";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
export const Login: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const sessionActive = select(isSessionActive());
    const users = select(getUsers());
    const queryParams = new URLSearchParams(window.location.search);
    const redirect = queryParams.get("redirect");
    const [selectedUser, setSelectedUser] = useState(users[0]?.id || "");
    const [showPassword, setShowPassword] = useState(false);

    const validationSchema = Yup.object({
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    const formik = useFormik({
        initialValues: { password: "" },
        validationSchema,
        onSubmit: (values) => {
            dispatch(
                sessionActions.login({
                    id: selectedUser,
                    password: values.password,
                })
            )
                .unwrap()
                .catch((error) => alert(error.message));
        },
    });

    if (sessionActive) {
        return <Navigate to={redirect || "/"} />;
    }

    return (
        <Box
        sx={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundImage: "linear-gradient(135deg,rgb(26, 212, 116),rgb(212, 214, 218))",
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: "100px 20px",
        }}
    >
        <Box sx={{ textAlign: 'center',marginBottom: '50px' }}>
        <Typography
            variant="h4"
            sx={{
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
                marginBotton: 0,
                textShadow: "0px 2px 3px rgba(0, 0, 0, 0.3)",
                padding: 2,
            }}
        >
            Welcome to the Employee-polls App
        </Typography>
        </Box>
            <Stack
    			spacing={3}
    		sx={{
        		width: "100%",
        		maxWidth: "400px",
        		backgroundColor: "rgba(248, 245, 245, 0.80)", 
        		backdropFilter: "blur(5px)",
        		padding: 3,
        		borderRadius: "16px",
        		boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
        		textAlign: "center",
                
    		}}
		>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Avatar
                        src={users.find((user) => user.id === selectedUser)?.avatarURL}
                        alt="User Avatar"
                        sx={{
                            width: 60,
                            height: 60,
                            margin: "0 auto",
                            boxShadow: "0 4px 10px hsla(0, 48.30%, 65.90%, 0.20)",
                        }}
                    />
                </motion.div>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "bold", color: "#333" }}
                >
                    Login
                </Typography>
                <TextField
                    label="Username or ID"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    select
                    SelectProps={{ native: true }}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "5px",
                            backgroundColor: "rgba(0, 0, 0, 0.2",
                        },
                    }}
                >
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </TextField>
                <TextField
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    fullWidth
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "5px",
                            backgroundColor: "rgba(0, 0, 0, 0.2",
                        },
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button
                    onClick={() => formik.handleSubmit()}
                    variant="contained"
                    sx={{
                        background: "linear-gradient(135deg, #1e88e5, #4caf50)",
                        borderRadius: "5px",
                        padding: "15px",
                        fontWeight: "bold",
                        "&:hover": {
                            background: "linear-gradient(135deg,hsl(122, 94.20%, 47.30%),hsl(4, 91.10%, 48.40%))",
                        },
                    }}
                >
                    Login
                </Button>
            </Stack>
        </Box>
    );
};

export default Login;
