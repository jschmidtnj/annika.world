import * as React from "react";
import {
  GatsbyImage,
  IGatsbyImageData,
} from "gatsby-plugin-image";
import Grid from "@mui/material/Grid";
import { Box, Stack, Typography } from "@mui/material";
import { getFontFamily } from "../utils";

const defaultNumColumns = 10
const maxWidthSingleImage = "28rem";

export interface ImageMetadata {
  caption: string;
  showCaption: boolean;
  width?: number;
  column?: number;
  year: number;
}

const Image: React.FC<{
  image: IGatsbyImageData;
  metadata: ImageMetadata;
  numColumns: number;
  maxWidth?: string;
  onClick?: () => void;
}> = (props) => {
  const [active, setActive] = React.useState(false);
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: props.maxWidth,
        mx: "auto",
        position: "relative",
        cursor: props.onClick ? "pointer" : undefined,
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={props.onClick}
    >
      {!active ? null : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            width: "100%",
            px: 1,
            pointerEvents: "none",
          }}
        >
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
          width: "100%",
          opacity: !active ? undefined : (!props.metadata.year && !props.metadata.showCaption) ? 0.9 : 0.3,
          transition: "0.25s ease"
        }}
        alt={props.metadata.caption}
        image={props.image!}
      />
    </Box>
  );
};

interface ImageItem {
  image: IGatsbyImageData
  metadata: ImageMetadata;
  index: number;
}

const ImageGrid: React.FC<{
  images: IGatsbyImageData[];
  metadata: ImageMetadata[];
  onImageClick?: (index: number) => void;
}> = (props) => {
  const customNumColumns = React.useMemo(() => Math.max(...props.metadata.map(image => image.column ? image.column : 0)), [props.metadata]);
  const numColumns = React.useMemo(() => customNumColumns <= 0 ? defaultNumColumns : customNumColumns, [customNumColumns, props.metadata]);

  const sortedImages = React.useMemo(() => {
    if (customNumColumns <= 0) {
      return props.images.map((image, idx): ImageItem[] => [{
        image,
        metadata: props.metadata[idx],
        index: idx,
      }]);
    }

    const grid: ImageItem[][] = [];
    for (let i = 0; i < props.images.length; ++i) {
      const image = props.images[i];
      const metadata = props.metadata[i]
      if (!metadata.column || metadata.column <= 0) {
        continue;
      }
      const currIndex = metadata.column - 1;
      for (let j = grid.length; j <= currIndex; ++j) {
        grid.push([]);
      }
      grid[currIndex].push({
        image,
        metadata,
        index: i
      });
    }

    console.log(grid);

    return grid;
  }, [customNumColumns, props.images, props.metadata]);

  return (
    <Grid container sx={{ mt: 4, justifyContent: "center" }} rowSpacing={1.5} columns={numColumns} columnSpacing={1}>
      {sortedImages.map((images, colIdx) => {
        const imageElements = images.map((imageItem, rowIdx) => {
          const metadata = imageItem.metadata;
          const key = `image-${metadata.caption}-${colIdx}-${rowIdx}`;

          return (
            <Image
              image={imageItem.image}
              key={key}
              metadata={metadata}
              numColumns={numColumns}
              maxWidth={metadata.width === numColumns ? maxWidthSingleImage : undefined}
              onClick={props.onImageClick ? () => props.onImageClick?.(imageItem.index) : undefined}
            />
          );
        });

        if (imageElements.length === 0) {
          return null;
        }
        if (imageElements.length === 1) {
          return (
            <Grid
              key={`col-${colIdx}`}
              size={{
                xs: 12,
                sm: 12,
                md: images[0].metadata.width && images[0].metadata.width > 0 ? images[0].metadata.width : numColumns,
              }}
            >
              {imageElements[0]}
            </Grid>
          );
        }
        return (
          <Grid
            key={`col-${colIdx}`}
            size={{
              xs: 12,
              sm: 12,
              md: 1,
            }}
          >
            <Stack spacing={1.5}>
              {imageElements}
            </Stack>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ImageGrid;
