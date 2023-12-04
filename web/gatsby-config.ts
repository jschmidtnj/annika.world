import { config as dotenv } from "dotenv";
import type { GatsbyConfig } from "gatsby";

dotenv();

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Annika World",
    siteUrl: "https://annika.world",
    instagram: "https://www.instagram.com/5icklove",
    soundcloud: "https://soundcloud.com/5icklove",
    linkedin: "https://www.linkedin.com/in/nyc-annika",
    contactEmail: "hello@annika.world",
    studioEmail: "studio@annika.world",
  },
  trailingSlash: 'never',
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          // Cache images for a week
          '/*.jpg': [
            'Cache-Control: public, max-age=604800'
          ],
          '/*.png': [
            'Cache-Control: public, max-age=604800'
          ]
        }
      }
    },
    "gatsby-plugin-netlify-cms",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS, // Google Analytics / GA
        ],
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: `${__dirname}/content/assets/icon.png`,
      },
    },
    {
      resolve: "gatsby-plugin-material-ui",
      options: {
        pathToEmotionCacheProps: "src/emotion-cache-props",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "assets",
        path: `${__dirname}/content/assets`,
      },
      __key: "assets",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/content/pages/`,
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "uploads",
        path: `${__dirname}/content/uploads/`,
      },
      __key: "uploads",
    },
  ],
};

export default config;
