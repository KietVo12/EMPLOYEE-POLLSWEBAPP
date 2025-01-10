import { useState, MouseEvent } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { logoutAuthedUser } from "../../../state/modules/authedUser";
import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { toggleTheme } from "../../../state/modules/prefrences/prefrencesSlice";
import { useNavigate } from "react-router-dom";
import PageRoutes from "../../../state/types/page_routes";
import { shallowEqual } from "react-redux";

const settings = ["logout"];
const mobileSettings = ["Toggle Theme"];

export default function UserMenu() {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [user, darkThemeEnabled] = useAppSelector(
    (state) => [
      state.users.entities[state.authedUser.entities!],
      state.prefrences.darkthemeEnabled,
    ],
    shallowEqual
  );

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = (option?: string) => {
    setAnchorElUser(null);
    if (option) {
      switch (option) {
        case "logout":
          dispatch(logoutAuthedUser());
          navigate(PageRoutes.Login, { replace: true });
          break;
        case "Toggle Theme":
          changeTheme();
          break;
      }
    }
  };

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Box display="flex" alignItems="center">
      <FormGroup sx={{ display: { xs: "none", md: "flex" } }}>
        <FormControlLabel
          control={<Switch checked={darkThemeEnabled} onChange={changeTheme} />}
          label="Dark Theme"
        />
      </FormGroup>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu}>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            <Avatar
              alt={user.name}
              src={user.avatarURL}
              sx={{ width: "2.25rem", height: "2.25rem" }}
            />
            <Typography
              variant="h6"
              color="white"
              sx={{
                alignItems: "center",
                display: { xs: "none", md: "inherit" },
                gap: "0.25rem",
              }}
            >
              {user.name}
              {anchorElUser ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Typography>
          </Box>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "2.75rem" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => handleCloseUserMenu()}
      >
        {mobileSettings.map((setting) => (
          <MenuItem
            sx={{ display: { sm: "inhirit", md: "none" } }}
            key={setting}
            onClick={() => handleCloseUserMenu(setting)}
          >
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
