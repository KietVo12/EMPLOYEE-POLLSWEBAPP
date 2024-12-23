import React from "react";
import ReactDOM from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme, StyledEngineProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux/store";

const theme = createTheme({
  palette: {
    primary: { main: "#6200ea" },
    secondary: { main: "#03dac5" },
    background: { default: "#f8f9fa" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: { fontWeight: 600 },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
