import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { Box, Stack, Typography, Link, useMediaQuery, useTheme } from "@mui/material";
import { CloudQueue } from "@mui/icons-material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

interface ContactData {
  site: {
    siteMetadata: {
      contactEmail: string;
      instagram: string;
      soundcloud: string;
      linkedin: string;
    };
  };
  backgroundLeft: ImageDataLike;
  backgroundRight: ImageDataLike;
}

const ContactPage: React.FC<PageProps<ContactData>> = (props) => {
  const backgroundLeft = React.useMemo(
    () => getImage(props.data.backgroundLeft),
    [props.data.backgroundLeft]
  );
  const backgroundRight = React.useMemo(
    () => getImage(props.data.backgroundRight),
    [props.data.backgroundRight]
  );
  const theme = useTheme();
  const isNotSmall = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Layout>
      <Stack direction="row" justifyContent={{ xs: "center", sm: "space-between" }} spacing={2}>
        {!isNotSmall ? null : (
          <GatsbyImage
            style={{
              height: "100%",
              width: "250px"
            }}
            alt="tattoo"
            image={backgroundLeft!}
            imgStyle={{ transition: 'none' }}
            loading="eager"
          />
        )}
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
        {!isNotSmall ? null : (
          <GatsbyImage
            style={{
              height: "100%",
              width: "250px"
            }}
            alt="tattoo"
            image={backgroundRight!}
            imgStyle={{ transition: 'none' }}
            loading="eager"
          />
        )}
      </Stack>
    </Layout>
  );
};

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
    backgroundLeft: file(
      absolutePath: { regex: "/.*/content/assets/contact_background_left.png$/" }
    ) {
      childImageSharp {
        gatsbyImageData(
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
          layout: FULL_WIDTH
        )
      }
    }
    backgroundRight: file(
      absolutePath: { regex: "/.*/content/assets/contact_background_right.png$/" }
    ) {
      childImageSharp {
        gatsbyImageData(
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
          layout: FULL_WIDTH
        )
      }
    }
  }
`;
