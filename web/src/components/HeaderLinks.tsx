import * as React from "react";
import { Stack, StackProps, LinkProps } from "@mui/material";
import { getFontFamily } from "../utils";
import Link from "./Link";

interface PageData {
  title: string;
  path: string;
  secondaryColor?: boolean;
}

const pages: PageData[] = [
  {
    title: "film",
    path: "/film",
  },
  {
    title: "tattoo",
    path: "/tattoo",
  },
  {
    title: "fine art",
    path: "/fine-art",
  },
  {
    title: "music",
    path: "/music",
    secondaryColor: true,
  },
  {
    title: "writing",
    path: "/writing",
    secondaryColor: true,
  },
  {
    title: "shop",
    path: "/shop",
    secondaryColor: true,
  },
  {
    title: "about",
    path: "/about",
  },
  {
    title: "contact",
    path: "/contact",
  },
];

const HeaderLinks: React.FC<
  StackProps & {
    linkProps?: LinkProps;
  }
> = ({ linkProps, ...props }) => (
  <Stack spacing={1} justifyContent="center" direction="row" {...props}>
    {pages.map((page) => (
      <Link
        to={page.path}
        key={`page-link-${page.path}`}
        textTransform="uppercase"
        fontFamily={getFontFamily("Bebas Neue")}
        underline="none"
        {...linkProps}
        color={page.secondaryColor ? "accent.main" : undefined}
      >
        {page.title}
      </Link>
    ))}
  </Stack>
);

export default HeaderLinks;
