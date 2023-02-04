/* eslint-disable import/prefer-default-export */
import * as React from "react";
import type { GatsbySSR } from "gatsby";
import Wrapper from "./src/components/Wrapper";
import SEO from "./src/components/SEO";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return <Wrapper>{element}</Wrapper>;
};

export const onPreRenderHTML: GatsbySSR["onPreRenderHTML"] = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  headComponents.push(<SEO key="seo-content" />);
  replaceHeadComponents(headComponents);
};
