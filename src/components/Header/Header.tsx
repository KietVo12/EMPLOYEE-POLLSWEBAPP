import { AppBar, Tab, Tabs, Toolbar, Box, Button } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UserPanel from "./UserPanel";
import { HeaderProps } from "./types";
import { useTheme } from "../../context/ThemeContext";
import SearchBar from "../Question/SearchBar";

export const Header = ({ tabs }: HeaderProps) => {
  const { darkMode, toggleTheme } = useTheme(); // Lấy trạng thái chế độ sáng/tối
  const DEFAULT_PATH = "/";
  const currentPath = window.location.pathname;
  const navigate = useNavigate();

  const selected = tabs.find((t) => t.path === currentPath)
    ? currentPath
    : DEFAULT_PATH;

  const handleOnClick = (path: string | undefined) => {
    if (path) navigate(path);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          backdropFilter: "blur(10px)",
          backgroundColor: (theme) => theme.palette.background.default,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          paddingX: 2,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Tabs Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Tabs
              value={selected}
              textColor="primary"
              indicatorColor="secondary"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: "bold",
                  fontSize: 16,
                  color: (theme) => theme.palette.text.primary,
                  ":hover": {
                    color: "primary.main",
                  },
                },
                "& .Mui-selected": {
                  color: "primary.main",
                },
              }}
            >
              {tabs.map((tab) => (
                <Tab
                  id={tab.name}
                  key={tab.name}
                  label={tab.name}
                  value={tab.path}
                  onClick={() => handleOnClick(tab.path)}
                />
              ))}
            </Tabs>
          </motion.div>

          {/* User Panel and Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Button onClick={toggleTheme} variant="outlined">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <UserPanel />
            </Box>
          </motion.div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
};

export default Header;
