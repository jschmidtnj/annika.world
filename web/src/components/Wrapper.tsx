import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../src/theme";

const Wrapper: React.FC<{
  children: React.ReactNode
}> = (props) => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {props.children}
    </ThemeProvider>
  </React.Fragment>
);

export default Wrapper;
