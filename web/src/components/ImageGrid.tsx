import * as React from "react";
import {
  GatsbyImage,
  IGatsbyImageData,
} from "gatsby-plugin-image";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Typography } from "@mui/material";
import { getFontFamily } from "../utils";

export interface ImageMetadata {
  caption: string;
  showCaption: boolean;
  width: number;
  year: number;
}

const Image: React.FC<{
  image: IGatsbyImageData;
  metadata: ImageMetadata;
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
        <Box position="relative" top="40%" zIndex={1} height={0}>
          {!props.metadata.showCaption ? null : (
            <Typography
              textTransform="uppercase"
              color="white"
              fontWeight="bold"
              textAlign="center"
              variant="h5"
              fontFamily={getFontFamily("Bebas Neue")}
            >
              {props.metadata.caption}
            </Typography>
          )}
          {!props.metadata.year ? null : (
            <Typography
              color="white"
              fontWeight="bold"
              textAlign="center"
              variant="h5"
              fontFamily={getFontFamily("Bebas Neue")}
            >
              {props.metadata.year}
            </Typography>
          )}
        </Box>
      )}
      <GatsbyImage
        style={{
          height: "100%",
          opacity: !active ? undefined : (!props.metadata.year && !props.metadata.showCaption) ? 0.9 : 0.3,
          transition: "0.25s ease",
        }}
        alt={props.metadata.caption}
        image={props.image!}
      />
    </Grid>
  );
};

const ImageGrid: React.FC<{
  images: IGatsbyImageData[];
  metadata: ImageMetadata[];
}> = (props) => {
  return (
    <Grid container mt={4} rowSpacing={1.5} columns={10} columnSpacing={1}>
      {props.images.map((image, idx) => (
        <Image
          image={image}
          key={`image-${props.metadata[idx].caption}`}
          metadata={props.metadata[idx]}
        />
      ))}
    </Grid>
  );
};

export default ImageGrid;
