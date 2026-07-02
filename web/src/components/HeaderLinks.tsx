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
    title: "art",
    path: "/art",
    accent: "accent.300",
  },
  {
    title: "text",
    path: "/text",
    disabled: true,
  },
  {
    title: "film",
    path: "/film",
    accent: "accent.100",
    disabled: true,
  },
  {
    title: "tattoo",
    path: "/tattoo",
    accent: "accent.200",
    disabled: true,
  },
  {
    title: "bio",
    path: "/about",
    accent: "accent.400",
  },
  {
    title: "music",
    path: "/music",
    disabled: true,
  },
  {
    title: "shop",
    path: "/shop",
    disabled: true,
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
    <Stack spacing={0} direction="row" {...props} sx={{ justifyContent: "center", ...props.sx }}>
      {pages.map((page) =>
        page.disabled ? null : (
          <Link
            to={page.path}
            key={`page-link-${page.path}`}
            underline="none"
            variant="h5"
            {...linkProps}
            color={
              page.path !== location.pathname
                ? undefined : page.accent ? page.accent : "accent.light"
            }
            sx={{
              marginLeft: "10px !important",
              textTransform: "uppercase",
              fontFamily: getFontFamily("Bebas Neue"),
              whiteSpace: "nowrap",
              ...linkProps?.sx,
            }}
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
