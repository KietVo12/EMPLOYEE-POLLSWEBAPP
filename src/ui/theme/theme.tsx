import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#008cf7", //light blue
      "50": "#e2f1fe",
      "100": "#b8dbfc",
      "200": "#8bc4fb",
      "300": "#5aadf9",
      "400": "#339cf9",
      "500": "#008cf7",
      "600": "#067ee8",
      "700": "#0c6cd5",
      "800": "#0d5ac2",
      "900": "#0e3ca3",
    },
    secondary: {
      main: "#d355e9", //pink
      "50": "#f8e4fb",
      "100": "#ecbbf5",
      "200": "#e08bef",
      "300": "#d355e9",
      "400": "#c815e3",
      "500": "#b800d7",
      "600": "#a700d3",
      "700": "#9000cc",
      "800": "#7a00c5",
      "900": "#4f00ba",
    },
    success: {
      main: "#50C878",
    },
    background: {
      default: "#f2f2f2",
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d355e9", //pink
      "50": "#f8e4fb",
      "100": "#ecbbf5",
      "200": "#e08bef",
      "300": "#d355e9",
      "400": "#c815e3",
      "500": "#b800d7",
      "600": "#a700d3",
      "700": "#9000cc",
      "800": "#7a00c5",
      "900": "#4f00ba",
    },
    secondary: {
      main: "#008cf7", //light blue
      "50": "#e2f1fe",
      "100": "#b8dbfc",
      "200": "#8bc4fb",
      "300": "#5aadf9",
      "400": "#339cf9",
      "500": "#008cf7",
      "600": "#067ee8",
      "700": "#0c6cd5",
      "800": "#0d5ac2",
      "900": "#0e3ca3",
    },
  },
});
