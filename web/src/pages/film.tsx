import * as React from "react";
import { PageProps } from "gatsby";
import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";
import Reel from "../../content/assets/reel.mp4";
import ReactPlayer from "react-player/lazy";

const FilmPage: React.FC<PageProps> = () => (
  <Layout>
    <Box mt={4}>
      <ReactPlayer
        width="100%"
        height="500px"
        url={Reel}
        controls
        muted
        playing
      />
    </Box>
  </Layout>
);

export default FilmPage;
