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
      series: markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/series.md$/" }) {
        frontmatter {
          series {
            title
          }
        }
      }
      ecosystems: markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/ecosystems.md$/" }) {
        frontmatter {
          ecosystems {
            title
          }
        }
      }
      portfolio: markdownRemark(fileAbsolutePath: { regex: "/.*/content/pages/portfolio.md$/" }) {
        frontmatter {
          years {
            year
          }
          projects {
            title
          }
        }
      }
    }
  `);

  if (result.errors) {
    throw result.errors;
  }

  const seriesList = result.data?.series?.frontmatter?.series || [];
  const ecosystemList = result.data?.ecosystems?.frontmatter?.ecosystems || [];
  const portfolioYears = result.data?.portfolio?.frontmatter?.years || [];
  const portfolioProjects = result.data?.portfolio?.frontmatter?.projects || [];

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

  ecosystemList.forEach((ecosystemsItem: any) => {
    if (!ecosystemsItem.title) return;
    const slug = ecosystemsItem.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    createPage({
      path: `/ecosystem/${slug}`,
      component: path.resolve(`./src/templates/ecosystem.tsx`),
      context: {
        ecosystemTitle: ecosystemsItem.title,
      },
    });
  });

  portfolioProjects.forEach((projectItem: any) => {
    if (!projectItem.title) return;
    const slug = projectItem.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    createPage({
      path: `/portfolio/${slug}`,
      component: path.resolve(`./src/templates/project.tsx`),
      context: {
        projectTitle: projectItem.title,
      },
    });
  });

  portfolioYears.forEach((yearItem: any) => {
    if (!yearItem.year) return;
    createPage({
      path: `/portfolio/${yearItem.year}`,
      component: path.resolve(`./src/templates/year.tsx`),
      context: {
        year: yearItem.year,
      },
    });
  });
};
