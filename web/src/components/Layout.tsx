import { Box, Container } from "@mui/material";
import * as React from "react";
import Header from "./Header";

const Layout: React.FC<{
  children: React.ReactNode;
}> = (props) => (
  <Container maxWidth="lg">
    <Box mt="8">
      <Header />
      {props.children}
    </Box>
  </Container>
);

export default Layout;
