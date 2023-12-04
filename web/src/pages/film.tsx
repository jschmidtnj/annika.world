import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { Box } from "@mui/material";
import ReactPlayer from "react-player/lazy";

interface FilmData {
  reel: {
    frontmatter: {
      video: string;
    };
  };
  reel2: {
    frontmatter: {
      video: string;
    };
  };
}

const Video: React.FC<{
  url: string;
  autoplay: boolean;
}> = (props) => (
  <ReactPlayer
    width="100%"
    height="500px"
    url={props.url}
    controls
    muted
    playing={props.autoplay}
  />
);

const FilmPage: React.FC<PageProps<FilmData>> = (props) => (
  <Layout>
    <Box mt={4}>
      <Video url={`/${props.data.reel.frontmatter.video}`} autoplay={true} />
    </Box>
    <Box mt={16}>
      <Video url={`/${props.data.reel2.frontmatter.video}`} autoplay={false} />
    </Box>
  </Layout>
);

export default FilmPage;

export const pageQuery = graphql`
  query {
    reel: markdownRemark(fileAbsolutePath: { regex: "/.*/content/uploads/reel.md$/" }) {
      frontmatter {
        video
      }
    }
    reel2: markdownRemark(fileAbsolutePath: { regex: "/.*/content/uploads/reel2.md$/" }) {
      frontmatter {
        video
      }
    }
  }
`;
