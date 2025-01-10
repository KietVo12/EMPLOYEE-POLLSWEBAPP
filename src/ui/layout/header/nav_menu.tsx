import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import PageRoutes from "../../../state/types/page_routes";
import { MouseEvent, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";

const pages = [
  { name: "Home", route: PageRoutes.Home },
  { name: "Leaderboard", route: PageRoutes.Leaderboard },
  { name: "New", route: PageRoutes.New },
];

export default function NavMenu() {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const navigte = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = ({ route }: { route?: string }) => {
    setAnchorElNav(null);
    if (route) navigte(route);
  };

  return (
    <>
      {/* small devices */}
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem
              key={page.name}
              onClick={() => handleCloseNavMenu({ route: page.route })}
            >
              <Typography textAlign="center">{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      {/*  medium devices and up */}
      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          gap: "0.5rem",
        }}
      >
        {pages.map((page) => (
          <Button
            key={page.name}
            onClick={() => handleCloseNavMenu({ route: page.route })}
            sx={{
              color: "white",
              display: "block",
              bgcolor: location.pathname === page.route ? "primary.300" : null,
              ":hover": { bgcolor: "primary.100", color: "black" },
            }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </>
  );
}
