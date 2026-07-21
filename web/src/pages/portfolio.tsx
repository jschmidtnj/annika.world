import * as React from "react";
import { graphql, PageProps, HeadFC, navigate } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import { getFontFamily } from "../utils";
import Link from "../components/Link";

interface GroupImage {
  image: ImageDataLike;
  isThumbnail: boolean;
  width: number;
}

interface Series {
  title: string;
  description: string;
  caption?: string;
  inPortfolio: boolean;
  images: GroupImage[];
}

interface Project {
  title: string;
  description: string;
  caption?: string;
  images: GroupImage[];
}

interface Year {
  year: number;
}

interface PortfolioPageData {
  series: {
    frontmatter: {
      series: Series[];
    };
  };
  portfolio: {
    frontmatter: {
      years: Year[];
      projects: Project[];
    };
  };
}

interface Group {
  title: string;
  description: string;
  caption?: string;
  images: GroupImage[];
  isSeries?: boolean;
}

const PortfolioPage: React.FC<PageProps<PortfolioPageData>> = (props) => {
  const years = React.useMemo(() => props.data.portfolio.frontmatter.years.map(curr => curr.year).sort(), []);

  const groups = React.useMemo(() => {
    const seriesGroups: Group[] = props.data.series.frontmatter.series.filter(el => el.inPortfolio).map(el => ({
      ...el,
      isSeries: true,
    }));
    const projectGroups: Group[] = props.data.portfolio.frontmatter.projects;
    return [...seriesGroups, ...projectGroups];
  }, []);

  return (
    <Layout>
      {/* Year Selection Header */}
      {years.length > 0 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 3, md: 5 },
            mb: { xs: 5, md: 8 },
            mt: 4,
          }}
        >
          {years.map((year) => (
            <Box
              key={year}
              onClick={() => navigate(`/portfolio/${year}`)}
              sx={{
                cursor: "pointer",
                fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                fontWeight: "normal",
                fontFamily: getFontFamily("Secular One"),
                color: "text.secondary",
                pb: 0.5,
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  color: "white",
                },
              }}
            >
              {year}
            </Box>
          ))}
        </Box>
      )}

      {/* Group Vertical List */}
      <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2 }}>
        {groups.map((group, idx) => {
          const slug = group.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");

          const thumbnailObj =
            group.images.find((img) => img.isThumbnail) ||
            group.images[0];
          const gatsbyImg = thumbnailObj ? getImage(thumbnailObj.image) : null;

          return (
            <Grid
              container
              spacing={{ xs: 3, md: 6 }}
              key={`group-item-${idx}`}
              sx={{
                mb: { xs: 6, md: 8 },
                alignItems: "center",
              }}
            >
              {/* Left Column: Thumbnail */}
              <Grid size={{ xs: 12, md: 5 }}>
                <Link
                  to={group.isSeries ? `/series/${slug}` : `/portfolio/${slug}`}
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
                      alt={group.title}
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
                      to={group.isSeries ? `/series/${slug}` : `/portfolio/${slug}`}
                      sx={{
                        textDecoration: "none",
                        color: "white",
                        "&:hover": {
                          color: "accent.500",
                        },
                        transition: "color 0.2s ease",
                      }}
                    >
                      {group.title}
                    </Link>
                  </Typography>
                  {group.caption && (
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: getFontFamily("Libre Franklin"),
                        color: "primary.main",
                        fontSize: { xs: "0.9rem", md: "1rem" },
                        fontWeight: 400,
                      }}
                    >
                      {group.caption}
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

export default PortfolioPage;

export const Head: HeadFC = () => <title>Portfolio | Annika World</title>;

export const pageQuery = graphql`
  query {
    series: markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/series.md$/" }) {
      frontmatter {
        series {
          title
          caption
          inPortfolio
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
            column
          }
        }
      }
    }
    portfolio: markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/portfolio.md$/" }) {
      frontmatter {
        years {
          year
        }
        projects {
          title
          caption
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
            column
          }
        }
      }
    }
  }
`;
