import * as React from "react";
import {
  GatsbyImage,
  IGatsbyImageData,
} from "gatsby-plugin-image";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Typography } from "@mui/material";
import { getFontFamily } from "../utils";

const numColumns = 10;
const maxWidthSingleImage = "28rem";

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
      maxWidth={props.metadata.width === numColumns ? maxWidthSingleImage : undefined}
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
          transition: "0.25s ease"
        }}
        alt={props.metadata.caption}
        image={props.image!}
      />
    </Grid>
  );
};

const CenterImage = (image: JSX.Element): JSX.Element => (
  <Box
    display="flex"
    minWidth="100%"
    justifyContent="center"
  >{image}</Box>
);

const ImageGrid: React.FC<{
  images: IGatsbyImageData[];
  metadata: ImageMetadata[];
}> = (props) => {
  return (
    <Grid container mt={4} rowSpacing={1.5} columns={numColumns} columnSpacing={1} justifyContent="center">
      {props.images.map((image, idx) => {
        const metadata = props.metadata[idx];

        const image_element =
          <Image
            image={image}
            key={`image-${metadata.caption}`}
            metadata={metadata}
          />;

        if (metadata.width === numColumns) {
          return CenterImage(image_element);
        }

        return image_element;
      })}
    </Grid>
  );
};

export default ImageGrid;
