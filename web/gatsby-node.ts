import type { GatsbyNode } from "gatsby";
import express from "express";
import path from "path";

export const onCreateDevServer: GatsbyNode["onCreateDevServer"] = ({ app }) => {
  app.use(
    "/admin",
    express.static(path.join(__dirname, "static", "admin"))
  );
};
