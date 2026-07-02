import * as React from "react";
import { graphql, PageProps, HeadFC, navigate } from "gatsby";
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

interface PortfolioPageData {
  markdownRemark: {
    frontmatter: {
      series: Series[];
    };
  };
}

const getYearFromDate = (dateStr?: string): string => {
  if (!dateStr) return "Unknown";
  const parts = dateStr.split("-");
  if (parts.length > 0 && parts[0].length === 4) {
    return parts[0];
  }
  const dateObj = new Date(dateStr);
  if (!isNaN(dateObj.getTime())) {
    return dateObj.getFullYear().toString();
  }
  return "Unknown";
};

const PortfolioPage: React.FC<PageProps<PortfolioPageData>> = (props) => {
  const seriesList = props.data.markdownRemark?.frontmatter?.series || [];

  // Get all unique years and sort them ascending (excluding year series)
  const years = React.useMemo(() => {
    const allYears = seriesList
      .filter((s) => !s.seriesType || s.seriesType === "default")
      .map((s) => getYearFromDate(s.date))
      .filter((y) => y !== "Unknown");
    const uniqueYears = Array.from(new Set(allYears));
    return uniqueYears.sort((a, b) => parseInt(a, 10) - parseInt(b, 10));
  }, [seriesList]);

  // Default to the most recent year
  const defaultYear = React.useMemo(() => {
    if (years.length === 0) return "";
    return years[years.length - 1];
  }, [years]);

  const [selectedYear, setSelectedYear] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedYear = sessionStorage.getItem("portfolioSelectedYear");
      if (savedYear && years.includes(savedYear)) {
        setSelectedYear(savedYear);
        return;
      }
    }
    if (defaultYear) {
      setSelectedYear(defaultYear);
    }
  }, [defaultYear, years]);

  const handleYearClick = (year: string) => {
    if (selectedYear === year) {
      navigate(`/series/${year}`);
      return;
    }
    setSelectedYear(year);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("portfolioSelectedYear", year);
    }
  };

  // Filter series by the selected year, excluding the year series itself
  const filteredSeries = React.useMemo(() => {
    if (!selectedYear) return [];
    return seriesList.filter(
      (s) => getYearFromDate(s.date) === selectedYear && (!s.seriesType || s.seriesType === "default")
    );
  }, [seriesList, selectedYear]);

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
          {years.map((year) => {
            const isSelected = selectedYear === year;
            return (
              <Box
                key={year}
                onClick={() => handleYearClick(year)}
                sx={{
                  cursor: "pointer",
                  fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
                  fontWeight: isSelected ? "bold" : "normal",
                  fontFamily: getFontFamily("Secular One"),
                  color: isSelected ? "white" : "text.secondary",
                  borderBottom: isSelected
                    ? "4px solid #5FE8FF"
                    : "4px solid transparent",
                  pb: 0.5,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                {year}
              </Box>
            );
          })}
        </Box>
      )}

      {/* Series Vertical List */}
      <Box sx={{ maxWidth: "1000px", mx: "auto", px: 2 }}>
        {filteredSeries.map((seriesItem, idx) => {
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

export default PortfolioPage;

export const Head: HeadFC = () => <title>Portfolio | Annika World</title>;

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
