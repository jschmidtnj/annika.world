import * as React from "react";
import {
  GatsbyImage,
  IGatsbyImageData,
} from "gatsby-plugin-image";
import Grid from "@mui/material/Grid";
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
      size={{
        xs: 12,
        sm: 12,
        md: props.metadata.width,
      }}
      sx={{
        maxWidth: props.metadata.width === numColumns ? maxWidthSingleImage : undefined
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {!active ? null : (
        <Box sx={{ position: "relative", top: "40%", zIndex: 1, height: 0 }}>
          {!props.metadata.showCaption ? null : (
            <Typography
              color="white"
              variant="h5"
              sx={{
                textTransform: "uppercase",
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: getFontFamily("Bebas Neue"),
              }}
            >
              {props.metadata.caption}
            </Typography>
          )}
          {!props.metadata.year ? null : (
            <Typography
              color="white"
              variant="h5"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                fontFamily: getFontFamily("Bebas Neue"),
              }}
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

const CenterImage = (image: React.ReactElement, key: string): React.ReactElement => (
  <Box
    key={key}
    sx={{
      display: "flex",
      minWidth: "100%",
      justifyContent: "center",
    }}
  >{image}</Box>
);

const ImageGrid: React.FC<{
  images: IGatsbyImageData[];
  metadata: ImageMetadata[];
}> = (props) => {
  return (
    <Grid container sx={{ mt: 4, justifyContent: "center" }} rowSpacing={1.5} columns={numColumns} columnSpacing={1}>
      {props.images.map((image, idx) => {
        const metadata = props.metadata[idx];
        const key = `image-${metadata.caption}-${idx}`;

        const image_element =
          <Image
            image={image}
            key={key}
            metadata={metadata}
          />;

        if (metadata.width === numColumns) {
          return CenterImage(image_element, key);
        }

        return image_element;
      })}
    </Grid>
  );
};

export default ImageGrid;
