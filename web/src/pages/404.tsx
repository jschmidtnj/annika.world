import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import { Container, Typography, Box } from "@mui/material";
import Link from "../components/Link";

const NotFoundPage: React.FC<PageProps> = () => (
  <Container maxWidth="lg">
    <Box >
      <Typography variant="h3" component="h1">
        Page not found
      </Typography>
      <Typography>
        Sorry 😔, we couldn't find what you were looking for.
        <br />
        <Link to="/">Go home</Link>.
      </Typography>
    </Box>
  </Container>
);

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
