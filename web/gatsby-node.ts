import type { GatsbyNode } from "gatsby";
import express from "express";
import path from "path";

export const onCreateDevServer: GatsbyNode["onCreateDevServer"] = ({ app }) => {
  app.use(
    "/admin",
    express.static(path.join(__dirname, "static", "admin"))
  );
};

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions;
  
  const result = await graphql<any>(`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/series.md$/" }) {
        frontmatter {
          series {
            title
          }
        }
      }
    }
  `);
  
  if (result.errors) {
    throw result.errors;
  }
  
  const seriesList = result.data?.markdownRemark?.frontmatter?.series || [];
  
  seriesList.forEach((seriesItem: any) => {
    if (!seriesItem.title) return;
    const slug = seriesItem.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
      
    createPage({
      path: `/series/${slug}`,
      component: path.resolve(`./src/templates/series.tsx`),
      context: {
        seriesTitle: seriesItem.title,
      },
    });
  });
};
