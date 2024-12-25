import { AppBar, Tab, Tabs, Toolbar, Box, Button, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import UserPanel from "./UserPanel";
import { HeaderProps } from "./types";
import { useTheme } from "../../context/ThemeContext";
import SearchBar from "../Question/SearchBar";
import PollManagement from "../Question/PollManagement"; // Import PollManagement
import { _getQuestions } from "../../service/_DATA";
import { useState, useEffect } from "react";

export const Header = ({ tabs }: HeaderProps) => {
  const { darkMode, toggleTheme } = useTheme();
  const DEFAULT_PATH = "/";
  const currentPath = window.location.pathname;
  const navigate = useNavigate();

  const [polls, setPolls] = useState([]); // State lưu polls từ _getQuestions
  const [showPollManagement, setShowPollManagement] = useState(false); // Toggle hiển thị PollManagement

  const selected = tabs.find((t) => t.path === currentPath)
    ? currentPath
    : DEFAULT_PATH;

  const handleOnClick = (path: string | undefined) => {
    if (path) navigate(path);
  };

  // Fetch questions for SearchBar
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await _getQuestions(); // Gọi API để lấy câu hỏi
        // if (data && typeof data === "object") {
        //   setPolls(Object.values(data)); // Chỉ set polls nếu data là object hợp lệ
        // } else {
        //   console.error("Invalid data format:", data);
        //   setPolls([]); // Nếu không hợp lệ, set polls rỗng
        // }
      } catch (error) {
        console.error("Error fetching questions:", error);
        setPolls([]); // Xử lý lỗi khi không thể lấy dữ liệu
      }
    };
    fetchQuestions();
  }, []);

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
            gap: 2,
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

          {/* SearchBar Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ flex: 1, maxWidth: "500px", margin: "0 auto" }}
          >
            <SearchBar polls={polls} />
          </motion.div>

          {/* Dark Mode and User Panel Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Box display="flex" alignItems="center" gap={2}>
              <Button
                onClick={toggleTheme}
                variant="outlined"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {darkMode ? "Light Mode" : "Dark Mode"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setShowPollManagement(!showPollManagement)}
              >
                {showPollManagement ? "Hide Polls" : "Show Polls"}
              </Button>
              <UserPanel />
            </Box>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Hiển thị PollManagement */}
      {showPollManagement ? (
        <Box sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Poll Management
          </Typography>
          <PollManagement />
        </Box>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Header;
