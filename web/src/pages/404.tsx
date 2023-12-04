import * as React from "react";
import { HeadFC, PageProps } from "gatsby";
import { Typography } from "@mui/material";
import Link from "../components/Link";
import Layout from "../components/Layout";

const NotFoundPage: React.FC<PageProps> = () => (
  <Layout>
    <Typography variant="h3" mt={4} component="h1">
      Page not found
    </Typography>
    <Typography>
      Sorry 😔, we couldn't find what you were looking for.
      <br />
      <Link to="/">Go home</Link>.
    </Typography>
  </Layout>
);

export default NotFoundPage;

export const Head: HeadFC = () => <title>Not found</title>;
