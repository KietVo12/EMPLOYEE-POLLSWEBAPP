import React, { createContext, useContext, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ThemeContext = createContext({
  toggleTheme: () => {},
  darkMode: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: { main: "#6200ea" },
      secondary: { main: "#ff4081" },
      background: {
        default: darkMode ? "#121212" : "#f4f4f9", // Đặt màu nền cho toàn bộ giao diện
        
      },
    },
  });

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
