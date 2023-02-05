import { config as dotenv } from 'dotenv'
import type { GatsbyConfig } from 'gatsby';

dotenv();

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'Annika World',
    siteUrl: 'https://annika.world',
    instagram: 'https://instagram.com',
    soundcloud: 'https://soundcloud.com'
  },
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-netlify',
    'gatsby-plugin-netlify-cms',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          process.env.GOOGLE_ANALYTICS, // Google Analytics / GA
        ],
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        pathToEmotionCacheProps: `src/emotion-cache-props`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: './content/assets/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: './content/assets/',
      },
      __key: 'assets',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './content/pages/',
      },
      __key: 'pages',
    },
  ],
};

export default config;
