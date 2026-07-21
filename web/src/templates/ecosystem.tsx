import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";
import Markdown from "../components/Markdown";
import ImageGrid, { ImageMetadata } from "../components/ImageGrid";
import Lightbox from "../components/Lightbox";
import { getFontFamily } from "../utils";

interface EcosystemImage {
  image: ImageDataLike;
  column: number;
}

interface Ecosystem {
  title: string;
  description: string;
  images: EcosystemImage[];
}

interface EcosystemTemplateData {
  markdownRemark: {
    frontmatter: {
      ecosystems: Ecosystem[];
    };
  };
}

interface PageContext {
  ecosystemTitle: string;
}

const EcosystemTemplate: React.FC<PageProps<EcosystemTemplateData, PageContext>> = (props) => {
  const { ecosystemTitle } = props.pageContext;
  const ecosystemList = props.data.markdownRemark?.frontmatter?.ecosystems || [];
  const ecosystem = ecosystemList.find((el) => el.title === ecosystemTitle);

  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  if (!ecosystem) {
    return (
      <Layout>
        <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
          Ecosystem not found
        </Typography>
      </Layout>
    );
  }

  const images = React.useMemo(() => {
    return ecosystem.images.map((img) => getImage(img.image)!);
  }, [ecosystem.images]);

  const metadata: ImageMetadata[] = React.useMemo(() => {
    return ecosystem.images.map((img) => ({
      caption: "",
      showCaption: false,
      year: 0,
      column: img.column,
    }));
  }, [ecosystem.images]);

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
          {ecosystem.title}
        </Typography>
        <Typography component="div" sx={{ maxWidth: "800px", mx: "auto" }}>
          <Markdown>{ecosystem.description}</Markdown>
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

export default EcosystemTemplate;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/ecosystems.md$/" }) {
      frontmatter {
        ecosystems {
          title
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
