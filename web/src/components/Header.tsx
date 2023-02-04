import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HeaderLinks from "./HeaderLinks";
import { useStaticQuery, graphql } from "gatsby";

interface HeaderData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Header: React.FC = () => {
  const data = useStaticQuery<HeaderData>(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <Stack mt={4} mb={8} direction="row" justifyContent="space-between" width="100%">
      <Typography>{data.site.siteMetadata.title}</Typography>
      <HeaderLinks />
    </Stack>
  );
};

export default Header;
