import * as React from "react";
import { Box, Container } from "@mui/material";
import Copyright from "./Copyright";
import Header from "./Header";

const Layout: React.FC<{
  children: React.ReactNode;
}> = (props) => (
  <Container maxWidth="lg">
    <Box minHeight="100vh">
      <Header mb={3} />
      {props.children}
    </Box>
    <Copyright my={4} />
  </Container>
);

export default Layout;
