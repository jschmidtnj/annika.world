import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import { Box, Typography } from "@mui/material";
import Markdown from "../components/Markdown";
import ImageGrid, { ImageMetadata } from "../components/ImageGrid";
import Lightbox from "../components/Lightbox";
import { getFontFamily } from "../utils";

interface ProjectImage {
  image: ImageDataLike;
  column: number;
}

interface Project {
  title: string;
  description: string;
  images: ProjectImage[];
}

interface ProjectTemplateData {
  markdownRemark: {
    frontmatter: {
      projects: Project[];
    };
  };
}

interface PageContext {
  projectTitle: string;
}

const ProjectTemplate: React.FC<PageProps<ProjectTemplateData, PageContext>> = (props) => {
  const { projectTitle } = props.pageContext;
  const projectList = props.data.markdownRemark?.frontmatter?.projects || [];
  const project = projectList.find((el) => el.title === projectTitle);

  const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

  if (!project) {
    return (
      <Layout>
        <Typography variant="h5" sx={{ mt: 4, textAlign: "center" }}>
          Project not found
        </Typography>
      </Layout>
    );
  }

  const images = React.useMemo(() => {
    return project.images.map((img) => getImage(img.image)!);
  }, [project.images]);

  const metadata: ImageMetadata[] = React.useMemo(() => {
    return project.images.map((img) => ({
      caption: "",
      showCaption: false,
      year: 0,
      column: img.column,
    }));
  }, [project.images]);

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
          {project.title}
        </Typography>
        <Typography component="div" sx={{ maxWidth: "800px", mx: "auto" }}>
          <Markdown>{project.description}</Markdown>
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

export default ProjectTemplate;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/portfolio.md$/" }) {
      frontmatter {
        projects {
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
