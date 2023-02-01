import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../components/Link";
import Copyright from "../components/Copyright";
import { PageProps } from "gatsby";

const IndexRoute = (_props: PageProps) => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
      <Link to="/about">Go to the about page</Link>
      <Copyright />
    </Box>
  </Container>
);

export default IndexRoute;
