import * as React from "react";
import { graphql, PageProps, navigate } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
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

interface SeriesPageData {
  markdownRemark: {
    frontmatter: {
      series: Series[];
    };
  };
}

const SeriesThumbnail: React.FC<{
  series: Series;
  slug: string;
}> = ({ series, slug }) => {
  const [active, setActive] = React.useState(false);

  const thumbnailObj = series.images.find(img => img.isThumbnail) || series.images[0];
  const gatsbyImg = thumbnailObj ? getImage(thumbnailObj.image) : null;

  const handleClick = () => {
    navigate(`/series/${slug}`);
  };

  return (
    <Grid
      size={{
        xs: 12,
        sm: 12,
        md: series.width || 3,
      }}
      sx={{
        cursor: "pointer",
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={handleClick}
    >
      {!active ? null : (
        <Box sx={{ position: "relative", top: "40%", zIndex: 1, height: 0 }}>
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
            {series.title}
          </Typography>
        </Box>
      )}
      {gatsbyImg && (
        <GatsbyImage
          style={{
            height: "100%",
            opacity: !active ? undefined : 0.3,
            transition: "0.25s ease"
          }}
          alt={series.title}
          image={gatsbyImg}
        />
      )}
    </Grid>
  );
};

const SeriesPage: React.FC<PageProps<SeriesPageData>> = (props) => {
  const seriesList = (props.data.markdownRemark?.frontmatter?.series || [])
    .filter((s) => !s.seriesType || s.seriesType === "default");

  return (
    <Layout>
      <Grid container sx={{ mt: 4, justifyContent: "center" }} rowSpacing={1.5} columns={10} columnSpacing={1}>
        {seriesList.map((seriesItem, idx) => {
          const slug = seriesItem.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)+/g, "");
          return (
            <SeriesThumbnail
              key={`series-${idx}`}
              series={seriesItem}
              slug={slug}
            />
          );
        })}
      </Grid>
    </Layout>
  );
};

export default SeriesPage;

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
