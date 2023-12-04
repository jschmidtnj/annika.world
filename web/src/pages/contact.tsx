import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { Box, Stack, Typography, Link } from "@mui/material";
import { CloudQueue } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface ContactData {
  site: {
    siteMetadata: {
      contactEmail: string;
      instagram: string;
      soundcloud: string;
      linkedin: string;
    };
  };
}

const ContactPage: React.FC<PageProps<ContactData>> = (props) => (
  <Layout>
    <Stack textAlign="center" mt={20} spacing={20} justifyContent="center">
      <Box>
        <Typography
          variant="h5"
          component="h2"
          textTransform="capitalize"
          fontWeight="bold"
          mb={3}
        >
          Studio
        </Typography>
        <Link
          href={`mailto:${props.data.site.siteMetadata.contactEmail}`}
          underline="none"
        >
          {props.data.site.siteMetadata.contactEmail}
        </Link>
      </Box>
      <Box>
        <Typography
          variant="h5"
          component="h2"
          textTransform="capitalize"
          fontWeight="bold"
          mb={2}
        >
          Social
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Link target="_blank" href={props.data.site.siteMetadata.instagram}>
            <InstagramIcon />
          </Link>
          <Link target="_blank" href={props.data.site.siteMetadata.soundcloud}>
            <CloudQueue />
          </Link>
          <Link target="_blank" href={props.data.site.siteMetadata.linkedin}>
            <LinkedInIcon />
          </Link>
        </Stack>
      </Box>
    </Stack>
  </Layout>
);

export default ContactPage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        contactEmail
        instagram
        soundcloud
        linkedin
      }
    }
  }
`;
