import * as React from "react";
import { graphql, PageProps } from "gatsby";
import Layout from "../components/Layout";
import { Box } from "@mui/material";
import ReactPlayer from "react-player/lazy";

interface FilmData {
  markdownRemark: {
    frontmatter: {
      reel: string;
    };
  };
}

const FilmPage: React.FC<PageProps<FilmData>> = () => (
  <Layout>
    <Box mt={4}>
      <ReactPlayer
        width="100%"
        height="500px"
        url="/reel.mp4"
        controls
        muted
        playing
      />
    </Box>
  </Layout>
);

export default FilmPage;

export const pageQuery = graphql`
  # query {
  #   markdownRemark(fileAbsolutePath: { regex: "/.*/content/uploads/reel.md$/" }) {
  #     frontmatter {
  #       reel
  #     }
  #   }
  # }
`;
