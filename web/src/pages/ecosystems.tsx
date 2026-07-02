import * as React from "react";
import { graphql, PageProps, HeadFC } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import { getFontFamily } from "../utils";
import Link from "../components/Link";

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

interface EcosystemsPageData {
  markdownRemark: {
    frontmatter: {
      series: Series[];
    };
  };
}

const EcosystemsPage: React.FC<PageProps<EcosystemsPageData>> = (props) => {
  const seriesList = props.data.markdownRemark?.frontmatter?.series || [];

  // Filter series by the "ecosystem" type
  const ecosystems = React.useMemo(() => {
    return seriesList.filter((s) => s.seriesType === "ecosystem");
  }, [seriesList]);

  return (
    <Layout>
      {/* Series Vertical List */}
      <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2, mt: 6 }}>
        {ecosystems.map((seriesItem, idx) => {
          const slug = seriesItem.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

          const thumbnailObj =
            seriesItem.images.find((img) => img.isThumbnail) ||
            seriesItem.images[0];
          const gatsbyImg = thumbnailObj ? getImage(thumbnailObj.image) : null;

          return (
            <Grid
              container
              spacing={{ xs: 3, md: 6 }}
              key={`series-item-${idx}`}
              sx={{
                mb: { xs: 6, md: 8 },
                alignItems: "center",
              }}
            >
              {/* Left Column: Thumbnail */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Link
                  to={`/series/${slug}`}
                  sx={{
                    display: "block",
                    textDecoration: "none",
                    overflow: "hidden",
                    borderRadius: "4px",
                    "&:hover img": {
                      transform: "scale(1.02)",
                      opacity: 0.9,
                    },
                  }}
                >
                  {gatsbyImg && (
                    <GatsbyImage
                      image={gatsbyImg}
                      alt={seriesItem.title}
                      style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                        transition: "transform 0.3s ease, opacity 0.3s ease",
                      }}
                    />
                  )}
                </Link>
              </Grid>

              {/* Right Column: Title and Caption */}
              <Grid size={{ xs: 12, md: 7 }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h2"
                    component="h2"
                    sx={{
                      fontFamily: getFontFamily("Secular One"),
                      fontWeight: "bold",
                      textTransform: "lowercase",
                      mb: 2,
                      fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                      lineHeight: 1.1,
                    }}
                  >
                    <Link
                      to={`/series/${slug}`}
                      sx={{
                        textDecoration: "none",
                        color: "white",
                        "&:hover": {
                          color: "accent.500",
                        },
                        transition: "color 0.2s ease",
                      }}
                    >
                      {seriesItem.title}
                    </Link>
                  </Typography>
                  {seriesItem.caption && (
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: getFontFamily("Libre Franklin"),
                        color: "primary.main",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 400,
                      }}
                    >
                      {seriesItem.caption}
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Layout>
  );
};

export default EcosystemsPage;

export const Head: HeadFC = () => <title>Ecosystems | Annika World</title>;

export const pageQuery = graphql`
  query {
    markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/series.md$/" }) {
      frontmatter {
        series {
          title
          date
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
