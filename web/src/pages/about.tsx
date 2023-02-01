import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "../components/Link";
import Copyright from "../components/Copyright";
import { graphql, PageProps } from "gatsby";

const AboutRoute = (_props: PageProps) => (
  <Container maxWidth="sm">
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About
      </Typography>
      <Link to="/">Go to the home page</Link>
      <Copyright />
    </Box>
  </Container>
);

export default AboutRoute;
