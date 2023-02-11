import * as React from "react";
import Carousel from "react-material-ui-carousel";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { graphql, PageProps } from "gatsby";
import { getFontFamily } from "../utils";
import HeaderLinks from "../components/HeaderLinks";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

const slideshowInterval: number = 1375; // ms

interface HomeData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  markdownRemark: {
    frontmatter: {
      images: {
        image: ImageDataLike;
        caption: string;
      }[];
    };
  };
}

const HomePage: React.FC<PageProps<HomeData>> = (props) => {
  const images = React.useMemo(
    () =>
      props.data.markdownRemark.frontmatter.images.map((img) => ({
        image: getImage(img.image),
        caption: img.caption,
      })),
    [props.data.markdownRemark.frontmatter.images]
  );
  return (
    <Container maxWidth="lg">
      <Box minHeight="100vh" position="relative">
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={{
            xs: "100%",
            sm: 500,
            md: 650,
          }}
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Carousel
            indicators={false}
            navButtonsAlwaysInvisible
            stopAutoPlayOnHover={false}
            interval={slideshowInterval}
          >
            {images.map((img) => (
              <Box height={500} key={`image-${img.caption}`}>
                <GatsbyImage
                  style={{
                    height: "100%",
                    opacity: 0.8,
                  }}
                  alt={img.caption}
                  image={img.image!}
                />
              </Box>
            ))}
          </Carousel>
        </Box>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
          }}
          zIndex={1}
          width={{
            xs: undefined,
            sm: 600,
            md: 800,
          }}
          textAlign="center"
        >
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
};

export default HomePage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/art.md$/" }) {
      frontmatter {
        images {
          image {
            childImageSharp {
              gatsbyImageData(
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
                layout: FULL_WIDTH
              )
            }
          }
          caption
        }
      }
    }
  }
`;
