import { config as dotenv } from "dotenv";
import type { GatsbyConfig } from "gatsby";

dotenv();

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Annika World",
    siteUrl: "https://annika.world",
    instagram: "https://instagram.com",
    soundcloud: "https://soundcloud.com",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-netlify",
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
  ],
};

export default config;
