import * as React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { Box, Typography } from "@mui/material";
import Markdown from "../components/Markdown";

interface AboutData {
  markdownRemark: {
    frontmatter: {
      image: IGatsbyImageData;
      biography: string;
      aboutArt: string;
      education: string;
      awards: string;
    };
  };
}

const TextCard: React.FC<{
  title: string;
  content: string;
}> = (props) => (
  <Box>
    <Typography fontWeight="bold" textTransform="uppercase">
      {props.title}
    </Typography>
    <Markdown>{props.content}</Markdown>
  </Box>
);

const AboutRoute = (props: PageProps<AboutData>) => {
  const heroImage = getImage(props.data.markdownRemark.frontmatter.image);
  return (
    <Layout>
      <GatsbyImage alt="about" image={heroImage!} />
      <Grid container mt={4} spacing={2}>
        <Grid xs={12} sm={6}>
          <TextCard
            title="Biography"
            content={props.data.markdownRemark.frontmatter.biography}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <TextCard
            title="About the Art"
            content={props.data.markdownRemark.frontmatter.aboutArt}
          />
        </Grid>
        <Grid xs={12}>
          <TextCard
            title="Education"
            content={props.data.markdownRemark.frontmatter.education}
          />
        </Grid>
        <Grid xs={12}>
          <TextCard
            title="Distinctions"
            content={props.data.markdownRemark.frontmatter.awards}
          />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AboutRoute;

export const pageQuery = graphql`
  query {
    markdownRemark(
      fileAbsolutePath: { regex: "/.*/content/pages/about.md$/" }
    ) {
      frontmatter {
        biography
        aboutArt
        education
        awards
        image {
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: FULL_WIDTH
            )
          }
        }
      }
    }
  }
`;
