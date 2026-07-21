import * as React from "react";
import { graphql, PageProps, navigate } from "gatsby";
import { getImage, ImageDataLike, IGatsbyImageData } from "gatsby-plugin-image";
import Layout from "../components/Layout";
import ImageGrid, { ImageMetadata } from "../components/ImageGrid";

interface SeriesImage {
  image: ImageDataLike;
  isThumbnail: boolean;
}

interface Series {
  title: string;
  caption?: string;
  column: number;
  images: SeriesImage[];
}

interface SeriesPageData {
  markdownRemark: {
    frontmatter: {
      series: Series[];
    };
  };
}

const SeriesPage: React.FC<PageProps<SeriesPageData>> = (props) => {
  const seriesList = props.data.markdownRemark?.frontmatter?.series;

  const { images, metadata, slugs } = React.useMemo(() => {
    const imgs: IGatsbyImageData[] = [];
    const meta: ImageMetadata[] = [];
    const slugList: string[] = [];

    seriesList.forEach((s) => {
      const thumbnailObj =
        s.images.find((img) => img.isThumbnail) || s.images[0];
      if (!thumbnailObj) {
        return;
      }

      const gatsbyImg = getImage(thumbnailObj.image);
      if (!gatsbyImg) {
        return;
      }

      imgs.push(gatsbyImg);
      meta.push({
        caption: s.title,
        showCaption: true,
        year: 0,
        column: s.column,
      });
      const slug = s.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      slugList.push(slug);
    });

    return { images: imgs, metadata: meta, slugs: slugList };
  }, [seriesList]);

  const handleImageClick = (index: number) => {
    const slug = slugs[index];
    if (slug) {
      navigate(`/series/${slug}`);
    }
  };

  return (
    <Layout>
      <ImageGrid
        images={images}
        metadata={metadata}
        onImageClick={handleImageClick}
      />
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
          caption
          column
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
          }
        }
      }
    }
  }
`;
