import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { graphql, PageProps } from "gatsby";
import { getFontFamily } from "../utils";
import HeaderLinks from "../components/HeaderLinks";

interface HomeData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
};

const HomePage: React.FC<PageProps<HomeData>> = (props) => (
  <Container maxWidth="lg">
    <Box
      justifyContent="center"
      minHeight="100vh"
      textAlign="center"
      alignItems="center"
      display="flex"
    >
      <Box>
        <HeaderLinks
          mb={4}
          spacing={4}
          linkProps={{
            variant: "h4",
          }}
        />
        <Typography
          fontFamily={getFontFamily("Secular One")}
          fontWeight="bold"
          variant="h1"
          textTransform="uppercase"
          component="h1"
        >
          {props.data.site.siteMetadata.title}
        </Typography>
      </Box>
    </Box>
  </Container>
);

export default HomePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
