/* eslint-disable import/prefer-default-export */
import * as React from "react";
import type { GatsbyBrowser } from "gatsby";
import Wrapper from "./src/components/Wrapper";

import "@fontsource/libre-franklin";
import "@fontsource/bebas-neue";
import "@fontsource/secular-one";

export const wrapRootElement: GatsbyBrowser["wrapPageElement"] = ({
  element,
}) => {
  return <Wrapper>{element}</Wrapper>;
};

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  const head = document.head;
  const injectFirstNode = document.createComment(`mui-inject-first`);
  head.insertBefore(injectFirstNode, head.firstChild);
};
