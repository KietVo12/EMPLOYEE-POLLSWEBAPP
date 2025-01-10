import React, { FormEvent, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { User } from "../../../../state/modules/users";

export interface ILoginFormProps {
  user?: string | null;
  users: Record<string, User>;
  password: string;
  isLoading: boolean;
  errorMessage?: string; 
  

  onUserChange: (event: SelectChangeEvent) => void;
  onPasswordChange: (pw: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function LoginForm(props: ILoginFormProps) {
  const {
    user,
    users,
    password,
    isLoading,
    errorMessage,  
    onUserChange,
    onPasswordChange,
    onSubmit,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Chọn user */}
      <FormControl fullWidth>
        <InputLabel id="username-label">Username or ID</InputLabel>
        <Select
          inputProps={{ "data-testid": "username-select-menu" }}
          labelId="username-label"
          label="Username or ID"
          name="username"
          value={user ?? ""}
          required
          disabled={isLoading}
          onChange={onUserChange}
        >
          {Object.values(users).map((u) => (
            <MenuItem key={u.id} value={u.id}>
              <Stack direction="row" gap={1} alignItems="center">
                <Avatar src={u.avatarURL} alt={u.name} />
                <Typography>{u.name}</Typography>
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Nhập password */}
      <Box sx={{ position: "relative" }}>
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          disabled={isLoading}
          required
        />
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          onClick={() => setShowPassword(!showPassword)}
          edge="end"
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </Box>

      {/* Hiển thị lỗi nếu có */}
      {errorMessage && (
        <Typography color="error" variant="body2">
          {errorMessage}
        </Typography>
      )}

      {/* Nút login */}
      <Button
        variant="contained"
        type="submit"
        sx={{
          background: "linear-gradient(to right, #0ea5e9, #2dd4bf)",
          ":hover": {
            background: "linear-gradient(to right, #38bdf8, #5eead4)",
          },
          color: "#fff",
          fontWeight: "bold",
          height: 48,
        }}
      >
        LOGIN
      </Button>
    </Box>
  );
}
