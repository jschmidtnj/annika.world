import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";
import Markdown from "../components/Markdown";
import ImageGrid, { ImageMetadata } from "../components/ImageGrid";
import Lightbox from "../components/Lightbox";
import { getFontFamily } from "../utils";

interface YearImage {
  image: ImageDataLike;
  column: number;
}

interface Year {
  year: number;
  description: string;
  images: YearImage[];
}

interface SeriesTemplateData {
  markdownRemark: {
    frontmatter: {
      years: Year[];
    };
  };
}

interface PageContext {
  year: number;
}

const YearTemplate: React.FC<PageProps<SeriesTemplateData, PageContext>> = (props) => {
  const { year } = props.pageContext;
  const yearList = props.data.markdownRemark?.frontmatter?.years || [];
  const yearData = yearList.find((el) => el.year === year)!;

  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  if (!year) {
    return (
      <Layout>
        <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
          Year not found
        </Typography>
      </Layout>
    );
  }

  const images = React.useMemo(() => {
    return yearData.images.map((img) => getImage(img.image)!);
  }, [yearData.images]);

  const metadata: ImageMetadata[] = React.useMemo(() => {
    return yearData.images.map((img) => ({
      caption: "",
      showCaption: false,
      year: 0,
      column: img.column,
    }));
  }, [yearData.images]);

  const handleImageClick = (index: number) => {
    setLightboxIndex(index);
  };

  const handleClose = () => {
    setLightboxIndex(null);
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % images.length);
    }
  };

  return (
    <Layout>
      <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            mb: 2,
            fontFamily: getFontFamily("Bebas Neue"),
          }}
        >
          {yearData.year}
        </Typography>
        <Typography component="div" sx={{ maxWidth: "800px", mx: "auto" }}>
          <Markdown>{yearData.description}</Markdown>
        </Typography>
      </Box>

      <ImageGrid
        images={images}
        metadata={metadata}
        onImageClick={handleImageClick}
      />

      <Lightbox
        isOpen={lightboxIndex !== null}
        images={images}
        currentIndex={lightboxIndex || 0}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </Layout>
  );
};

export default YearTemplate;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/portfolio.md$/" }) {
      frontmatter {
        years {
          year
          description
          images {
            image {
              childImageSharp {
                gatsbyImageData(
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                  layout: FULL_WIDTH
                )
              }
            }
            column
          }
        }
      }
    }
  }
`;
