import * as React from "react";
import { Dialog, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";

interface LightboxProps {
  isOpen: boolean;
  images: IGatsbyImageData[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onPrev, onNext, onClose]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullScreen
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            boxShadow: "none",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          color: "white",
          zIndex: 1400,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.2)",
          },
        }}
      >
        <CloseIcon fontSize="large" />
      </IconButton>

      {images.length > 1 && (
        <IconButton
          onClick={onPrev}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            zIndex: 1400,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <ArrowBackIosNewIcon fontSize="large" />
        </IconButton>
      )}

      {images.length > 1 && (
        <IconButton
          onClick={onNext}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            zIndex: 1400,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
            },
          }}
        >
          <ArrowForwardIosIcon fontSize="large" />
        </IconButton>
      )}

      <Box
        sx={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          color: "rgba(255, 255, 255, 0.7)",
          fontFamily: "sans-serif",
          fontSize: "1rem",
          zIndex: 1400,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          px: 2,
          py: 0.5,
          borderRadius: 2,
        }}
      >
        {currentIndex + 1} / {images.length}
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          p: 8,
          boxSizing: "border-box",
        }}
        onClick={onClose}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            width: "90vw",
            height: "90vh",
            maxHeight: "90vh",
            maxWidth: "90vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GatsbyImage
            image={currentImage}
            alt={`Image ${currentIndex + 1}`}
            style={{
              width: "100%",
              height: "100%",
            }}
            imgStyle={{
              objectFit: "contain",
            }}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default Lightbox;
