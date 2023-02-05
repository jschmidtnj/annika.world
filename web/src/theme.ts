import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { getFontFamily } from "./utils";

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: getFontFamily("Libre Franklin"),
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    accent: {
      main: "#ff0000",
      contrastText: "#ff005c"
    }
  },
});

export default theme;
