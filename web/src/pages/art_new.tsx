import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { Box, Stack, Typography, Container } from "@mui/material";
import Layout from "../components/Layout";
import Link from "../components/Link";
import { getFontFamily } from "../utils";
import { artPages } from "../components/HeaderLinks";

interface ArtNewData {
  waterBackground: ImageDataLike;
}

const ArtNewPage: React.FC<PageProps<ArtNewData>> = (props) => {
  const waterImage = getImage(props.data.waterBackground);

  return (
    <Layout fullWidth>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "500px", sm: "600px", md: "700px" },
          overflow: "hidden",
        }}
      >
        {waterImage && (
          <GatsbyImage
            image={waterImage}
            alt="Water background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
            }}
            imgStyle={{
              objectFit: "cover",
            }}
            loading="eager"
          />
        )}
        <Container maxWidth="lg" sx={{ height: "100%", position: "relative", zIndex: 1 }}>
          <Stack
            spacing={1.5}
            sx={{
              height: "100%",
              justifyContent: "center",
              pl: { xs: 2, sm: 4, md: 6 },
            }}
          >
            {artPages.map((page) => {
              if (page.disabled) {
                return null;
              }

              return (
                <Link
                  to={page.path}
                  key={`art-link-${page.title}`}
                  underline="none"
                  sx={{
                    display: "inline-block",
                    width: "fit-content",
                  }}
                >
                  <Typography
                    variant="h2"
                    sx={{
                      fontFamily: getFontFamily("Secular One"),
                      fontWeight: 900,
                      textTransform: "lowercase",
                      color: "#ffffff",
                      letterSpacing: "-5px",
                      WebkitTextStroke: "1px #000000",
                      fontSize: { xs: "2.2rem", sm: "3.2rem", md: "4.5rem" },
                      lineHeight: 1.05,
                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "translateX(8px)",
                        color: "accent.500",
                      },
                    }}
                  >
                    {page.title}
                  </Typography>
                </Link>
              );
            })}
          </Stack>
        </Container>
      </Box>
    </Layout>
  );
};

export default ArtNewPage;

export const pageQuery = graphql`
  query {
    waterBackground: file(
      absolutePath: { regex: "/.*/content/assets/water_background.png$/" }
    ) {
      childImageSharp {
        gatsbyImageData(
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
          layout: FULL_WIDTH
        )
      }
    }
  }
`;
