import { ThemeProvider, responsiveFontSizes } from "@mui/material";
import { ReactNode } from "react";
import { darkTheme, theme } from "./theme";
import { useAppSelector } from "../app/hooks";

export interface IDarkThemeProviderProps {
  children?: ReactNode;
}

export default function DarkThemeProvider(props: IDarkThemeProviderProps) {
  const { children } = props;
  const darkThemeEnabled = useAppSelector(
    (state) => state.prefrences.darkthemeEnabled
  );
  return (
    <ThemeProvider
      theme={responsiveFontSizes(darkThemeEnabled ? darkTheme : theme)}
    >
      {children}
    </ThemeProvider>
  );
}
