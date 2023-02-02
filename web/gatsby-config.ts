import { config as dotenv } from 'dotenv'
import type { GatsbyConfig } from 'gatsby';

dotenv();

const config: GatsbyConfig = {
  siteMetadata: {
    title: 'annika.world',
    siteUrl: 'https://annika.world',
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
    'gatsby-plugin-mui-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-top-layout',
    'gatsby-plugin-mui-emotion',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-transformer-remark',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
};

export default config;
