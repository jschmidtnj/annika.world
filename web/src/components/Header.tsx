import * as React from "react";
import {
  Button,
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HeaderLinks from "./HeaderLinks";
import { useStaticQuery, graphql } from "gatsby";
import InstagramIcon from "@mui/icons-material/Instagram";
import { getFontFamily } from "../utils";
import Link from "./Link";
import { LibraryMusic } from "@mui/icons-material";

interface HeaderData {
  site: {
    siteMetadata: {
      title: string;
      instagram: string;
      soundcloud: string;
    };
  };
}

const HeartButton: React.FC<{
  toggleOpen: () => void;
  isStar: boolean;
}> = (props) => (
  <Button
    variant="text"
    onClick={props.toggleOpen}
    sx={{ minWidth: 0, padding: 0 }}
  >
    <Typography
      color={props.isStar ? "accent.contrastText" : undefined}
      variant="h5"
      fontWeight={props.isStar ? "bold" : undefined}
    >
      ♡
    </Typography>
  </Button>
);

const Social: React.FC<{
  siteMetadata: HeaderData["site"]["siteMetadata"];
  children?: React.ReactNode;
}> = (props) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {props.children}
    <Link target="_blank" pt={1} to={props.siteMetadata.instagram}>
      <InstagramIcon />
    </Link>
    <Link target="_blank" pt={1} to={props.siteMetadata.soundcloud}>
      <LibraryMusic />
    </Link>
  </Stack>
);

const Header: React.FC<StackProps> = (props) => {
  const [isClickedOpen, setIsClickedOpen] = React.useState(false);
  const [isStar, setIsStar] = React.useState(false);
  const theme = useTheme();
  const isNotSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const isOpen = React.useMemo(
    () => !isNotSmall && isClickedOpen,
    [isNotSmall, isClickedOpen]
  );
  const toggleOpen = React.useCallback(
    () => setIsClickedOpen(!isClickedOpen),
    [setIsClickedOpen, isClickedOpen]
  );
  const data = useStaticQuery<HeaderData>(graphql`
    query {
      site {
        siteMetadata {
          title
          instagram
          soundcloud
        }
      }
    }
  `);
  return (
    <Stack
      mt={4}
      direction={{ md: "row" }}
      justifyContent="space-between"
      width="100%"
      {...props}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        width={{
          xs: "100%",
          sm: undefined,
        }}
        justifyContent={{
          xs: "space-between",
          sm: "center",
          md: "flex-start",
        }}
      >
        {!isNotSmall ? (
          <HeartButton toggleOpen={toggleOpen} isStar={isStar} />
        ) : (
          <Social siteMetadata={data.site.siteMetadata}>
            <HeartButton toggleOpen={toggleOpen} isStar={isStar} />
          </Social>
        )}
        <Link
          to="/"
          fontWeight="bold"
          textTransform="uppercase"
          fontFamily={getFontFamily("Secular One")}
          variant="h4"
          underline="none"
          whiteSpace="nowrap"
          color={isStar ? "accent.contrastText" : undefined}
        >
          {data.site.siteMetadata.title}
        </Link>
        {isNotSmall ? null : (
          <Button
            variant="text"
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => setIsStar(!isStar)}
          >
            <Typography
              color={isStar ? "accent.contrastText" : undefined}
              fontWeight={isStar ? "bold" : undefined}
              variant="h5"
            >
              ☆
            </Typography>
          </Button>
        )}
      </Stack>
      {!isOpen && !isNotSmall ? null : (
        <HeaderLinks
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-end" }}
          linkProps={{
            textAlign: "center",
            variant: isNotSmall ? "h5" : !isStar ? "h4" : "h3",
            sx: !isStar
              ? undefined
              : {
                  "-webkit-text-fill-color": "black",
                  "-webkit-text-stroke-width": "1px",
                  "-webkit-text-stroke-color": "white",
                },
          }}
        >
          {!isOpen ? null : (
            <Social siteMetadata={data.site.siteMetadata} />
          )}
        </HeaderLinks>
      )}
    </Stack>
  );
};

export default Header;
