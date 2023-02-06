import * as React from "react";
import { Container } from "@mui/material";
import Copyright from "./Copyright";
import Header from "./Header";

const Layout: React.FC<{
  children: React.ReactNode;
}> = (props) => (
  <Container maxWidth="lg">
    <Header mb={3} />
    {props.children}
    <Copyright />
  </Container>
);

export default Layout;
