import * as React from "react";
import Carousel from "react-material-ui-carousel";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { graphql, PageProps } from "gatsby";
import HeaderLinks from "../components/HeaderLinks";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";

const slideshowInterval: number = 1000; // ms

interface HomeData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
  homeLogo: ImageDataLike;
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
  const homeLogo = React.useMemo(
    () => getImage(props.data.homeLogo),
    [props.data.homeLogo]
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
            duration={0}
            swipe={false}
            indicators={false}
            navButtonsAlwaysInvisible
            stopAutoPlayOnHover={false}
            interval={slideshowInterval}
          >
            {images.map((img) => (
              <Box height={{
                xs: 300,
                sm: 500
              }} key={`image-${img.caption}`}>
                <GatsbyImage
                  style={{
                    height: "100%",
                    opacity: 0.8,
                  }}
                  alt={img.caption}
                  image={img.image!}
                  imgStyle={{ transition: 'none' }}
                  loading="eager"
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
          <Box
            height={{
              xs: 40,
              sm: 80,
              md: 110
            }}
          >
            <GatsbyImage
              style={{
                height: "100%",
              }}
              alt={props.data.site.siteMetadata.title}
              image={homeLogo!}
              imgStyle={{ transition: 'none' }}
              loading="eager"
            />
          </Box>
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
    homeLogo: file(
      absolutePath: { regex: "/.*/content/assets/home_logo.png$/" }
    ) {
      childImageSharp {
        gatsbyImageData(
          placeholder: NONE
          formats: [AUTO, WEBP, AVIF]
          layout: FULL_WIDTH
        )
      }
    }
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/art.md$/" }) {
      frontmatter {
        images {
          image {
            childImageSharp {
              gatsbyImageData(
                placeholder: NONE
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
