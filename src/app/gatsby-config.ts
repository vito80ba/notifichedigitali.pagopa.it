import type { GatsbyConfig } from "gatsby";
import * as dotenv from "dotenv";

dotenv.config({ path: __dirname + `/.env.${process.env.NODE_ENV}` });

const config: GatsbyConfig = {
  pathPrefix: "/notifichedigitali.pagopa.it",
  siteMetadata: {
    metaTitle: `Piattaforma Notifiche`,
    canonicalURL: `http://localhost:8000`,
    metaDescription: `site-description`,
    metaSocial: {
      socialNetwork: `twitter`,
      title: `https://www.twitterdomain.tld`,
      description: `author`,
      image: `/site-icon.png`,
    },
    keywords: `random-stuff`,
    metaRobots: `stuff`,
    metaViewport: `width=device-width, initial-scale=1, shrink-to-fit=no`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-mdx",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-image",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_API_URL || "http://localhost:1337",
        accessToken: process.env.STRAPI_TOKEN,
        collectionTypes: [
          {
            singularName: "page",
            queryParams: {
              populate: "deep",
            },
          },
        ],
        singleTypes: [
          {
            singularName: "navigation",
            queryParams: {
              populate: "deep",
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-schema-snapshot`,
      options: {
        path: `schema.gql`,
        exclude: {
          plugins: [`gatsby-source-npm-package-search`],
        },
        update: false,
      },
    },
  ],
};

export default config;
