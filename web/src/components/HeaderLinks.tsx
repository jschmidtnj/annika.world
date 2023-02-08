import * as React from "react";
import { Stack, StackProps, LinkProps } from "@mui/material";
import { getFontFamily } from "../utils";
import Link from "./Link";
import { useLocation } from "@reach/router";

interface PageData {
  title: string;
  path: string;
  secondaryColor?: boolean;
  disabled?: boolean;
}

const pages: PageData[] = [
  {
    title: "film",
    path: "/film",
  },
  {
    title: "tattoo",
    path: "/tattoo",
    disabled: true,
  },
  {
    title: "fine art",
    path: "/art",
  },
  {
    title: "music",
    path: "/music",
    secondaryColor: true,
    disabled: true,
  },
  {
    title: "writing",
    path: "/writing",
    secondaryColor: true,
    disabled: true,
  },
  {
    title: "shop",
    path: "/shop",
    secondaryColor: true,
    disabled: true,
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
> = ({ linkProps, ...props }) => {
  const location = useLocation();
  return (
    <Stack spacing={1} justifyContent="center" direction="row" {...props}>
      {pages.map((page) =>
        page.disabled ? null : (
          <Link
            to={page.path}
            key={`page-link-${page.path}`}
            textTransform="uppercase"
            fontFamily={getFontFamily("Bebas Neue")}
            underline="none"
            variant="h5"
            whiteSpace="nowrap"
            {...linkProps}
            color={
              page.secondaryColor
                ? "accent.main"
                : page.path === location.pathname
                ? "accent.light"
                : undefined
            }
          >
            {page.title}
          </Link>
        )
      )}
      {props.children}
    </Stack>
  );
};

export default HeaderLinks;
