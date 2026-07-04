import * as React from "react";
import { Box, Container } from "@mui/material";
import Copyright from "./Copyright";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, fullWidth = false }) => {
  if (fullWidth) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Container maxWidth="lg">
          <Header sx={{ mb: 3 }} />
        </Container>
        <Box sx={{ minHeight: "100vh", flexGrow: 1, width: "100%", display: "flex", flexDirection: "column" }}>
          {children}
        </Box>
        <Container maxWidth="lg">
          <Copyright sx={{ my: 4 }} />
        </Container>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ minHeight: "100vh" }}>
        <Header sx={{ mb: 3 }} />
        {children}
      </Box>
      <Copyright sx={{ my: 4 }} />
    </Container>
  );
};


export default Layout;
