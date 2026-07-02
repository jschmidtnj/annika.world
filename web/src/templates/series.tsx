import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";
import Markdown from "../components/Markdown";
import ImageGrid from "../components/ImageGrid";
import Lightbox from "../components/Lightbox";
import { getFontFamily } from "../utils";

interface SeriesImage {
  image: ImageDataLike;
  isThumbnail: boolean;
  width: number;
}

interface Series {
  title: string;
  date?: string;
  description: string;
  caption?: string;
  seriesType?: string;
  width: number;
  images: SeriesImage[];
}

interface SeriesTemplateData {
  markdownRemark: {
    frontmatter: {
      series: Series[];
    };
  };
}

interface PageContext {
  seriesTitle: string;
}

const SeriesTemplate: React.FC<PageProps<SeriesTemplateData, PageContext>> = (props) => {
  const { seriesTitle } = props.pageContext;
  const seriesList = props.data.markdownRemark?.frontmatter?.series || [];
  const series = seriesList.find((s) => s.title === seriesTitle);

  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  if (!series) {
    return (
      <Layout>
        <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
          Series not found
        </Typography>
      </Layout>
    );
  }

  const images = React.useMemo(() => {
    return series.images.map((img) => getImage(img.image)!);
  }, [series.images]);

  const metadata = React.useMemo(() => {
    return series.images.map((img) => ({
      caption: "",
      showCaption: false,
      width: img.width,
      year: 0,
    }));
  }, [series.images]);

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
          {series.title}
        </Typography>
        <Typography component="div" sx={{ maxWidth: "800px", mx: "auto" }}>
          <Markdown>{series.description}</Markdown>
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

export default SeriesTemplate;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/series.md$/" }) {
      frontmatter {
        series {
          title
          date
          description
          caption
          seriesType
          width
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
            isThumbnail
            width
          }
        }
      }
    }
  }
`;
