import { createTheme } from "@mui/material";
import "@fontsource/pacifico";

export const appTheme = createTheme({
  palette: {
    primary: { main: "#1B262C" },
    secondary: { main: "#0F4C75" },
    success: { main: "#03C988" },
    error: { main: "#DC3535" },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontFamily: ["Pacifico", "sans-serif"].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          color: "white",
        },
      },
    },
  },
});
