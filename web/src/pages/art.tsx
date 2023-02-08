import * as React from "react";
import { graphql, PageProps } from "gatsby";
import {
  GatsbyImage,
  getImage,
  IGatsbyImageData,
  ImageDataLike,
} from "gatsby-plugin-image";
import Grid from "@mui/material/Unstable_Grid2";
import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";

interface metadata {
  caption: string;
  width: number;
  year: number;
}

interface ArtData {
  markdownRemark: {
    frontmatter: {
      images: ({
        image: ImageDataLike;
      } & metadata)[];
    };
  };
}

const Image: React.FC<{
  image: IGatsbyImageData;
  metadata: metadata;
}> = (props) => {
  const [active, setActive] = React.useState(false);
  return (
    <Grid
      xs={12}
      sm={12}
      md={props.metadata.width}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {!active ? null : (
        <Box position="relative" top="45%" zIndex={1} height={0}>
          <Typography
            textTransform="uppercase"
            color="white"
            fontWeight="bold"
            textAlign="center"
          >
            {props.metadata.caption}
          </Typography>
          <Typography
            color="white"
            fontWeight="bold"
            textAlign="center"
          >
            {props.metadata.year}
          </Typography>
        </Box>
      )}
      <GatsbyImage
        style={{
          height: "100%",
          opacity: !active ? undefined : 0.3,
          transition: "0.25s ease",
        }}
        alt={props.metadata.caption}
        image={props.image!}
      />
    </Grid>
  );
};

const ArtPage: React.FC<PageProps<ArtData>> = (props) => {
  const images = React.useMemo(
    () =>
      props.data.markdownRemark.frontmatter.images.map((img) =>
        getImage(img.image)
      ),
    [props.data.markdownRemark.frontmatter.images]
  );
  const metadata = React.useMemo(
    () =>
      props.data.markdownRemark.frontmatter.images.map((img) => ({
        caption: img.caption,
        width: img.width,
        year: img.year
      })),
    [props.data.markdownRemark.frontmatter.images]
  );
  return (
    <Layout>
      <Grid container mt={4} rowSpacing={1.5} columns={10} columnSpacing={1}>
        {images.map((image, idx) => (
          <Image
            image={image!}
            key={`image-${metadata[idx].caption}`}
            metadata={metadata[idx]}
          />
        ))}
      </Grid>
    </Layout>
  );
};

export default ArtPage;

export const pageQuery = graphql`
  query {
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
          width
          year
        }
      }
    }
  }
`;
