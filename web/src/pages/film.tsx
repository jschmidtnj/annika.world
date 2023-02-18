import * as React from "react";
import { PageProps } from "gatsby";
import Layout from "../components/Layout";
import { Box } from "@mui/material";
import ReactPlayer from "react-player/lazy";

const FilmPage: React.FC<PageProps> = () => (
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
