import * as React from "react";
import { Stack, StackProps, LinkProps } from "@mui/material";
import { getFontFamily } from "../utils";
import Link from "./Link";
import { useLocation } from "@reach/router";

interface PageData {
  title: string;
  path: string;
  disabled?: boolean;
  accent?: string;
}

const pages: PageData[] = [
  {
    title: "film",
    path: "/film",
    accent: "accent.100",
  },
  {
    title: "tattoo",
    path: "/tattoo",
    accent: "accent.200",
  },
  {
    title: "fine art",
    path: "/art",
    accent: "accent.300",
  },
  {
    title: "music",
    path: "/music",
    disabled: true,
  },
  {
    title: "writing",
    path: "/writing",
    disabled: true,
  },
  {
    title: "shop",
    path: "/shop",
    disabled: true,
  },
  {
    title: "about",
    path: "/about",
    accent: "accent.400",
  },
  {
    title: "contact",
    path: "/contact",
    accent: "accent.500",
  },
];

const HeaderLinks: React.FC<
  StackProps & {
    linkProps?: LinkProps;
  }
> = ({ linkProps, ...props }) => {
  const location = useLocation();
  return (
    <Stack spacing={0} justifyContent="center" direction="row" {...props}>
      {pages.map((page) =>
        page.disabled ? null : (
          <Link
            to={page.path}
            marginLeft="10px !important"
            key={`page-link-${page.path}`}
            textTransform="uppercase"
            fontFamily={getFontFamily("Bebas Neue")}
            underline="none"
            variant="h5"
            whiteSpace="nowrap"
            {...linkProps}
            color={
              page.path !== location.pathname
                ? undefined : page.accent ? page.accent : "accent.light"
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
