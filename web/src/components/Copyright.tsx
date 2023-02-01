import * as React from "react";
import Typography from "@mui/material/Typography";
import { graphql, useStaticQuery } from "gatsby";
import Link from "./Link";

interface CopyrightData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Copyright: React.FC = () => {
  const data = useStaticQuery<CopyrightData>(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="/">
        {data.site.siteMetadata.title}
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
