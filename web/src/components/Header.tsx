import * as React from "react";
import {
  Button,
  Stack,
  StackProps,
  Typography,
  useMediaQuery,
  useTheme,
  Link as ExternalLink,
} from "@mui/material";
import HeaderLinks from "./HeaderLinks";
import { useStaticQuery, graphql } from "gatsby";
import InstagramIcon from "@mui/icons-material/Instagram";
import { navigate } from "gatsby";
import { getFontFamily } from "../utils";
import Link from "./Link";
import { CloudQueue } from "@mui/icons-material";

const starStyle = false;

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
  handleClick: () => void;
  isStar: boolean;
}> = (props) => (
  <Button
    variant="text"
    onClick={props.handleClick}
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
    <ExternalLink target="_blank" pt={1} href={props.siteMetadata.instagram}>
      <InstagramIcon />
    </ExternalLink>
    <ExternalLink target="_blank" pt={1} href={props.siteMetadata.soundcloud}>
      <CloudQueue />
    </ExternalLink>
  </Stack>
);

const Header: React.FC<StackProps> = (props) => {
  const [isClickedOpen, setIsClickedOpen] = React.useState(false);
  const [isStar, setIsStar] = React.useState(false);
  const isStarStyle = React.useMemo(() => isStar && starStyle, [isStar]);
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
      py={2}
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
          <HeartButton handleClick={toggleOpen} isStar={isStar} />
        ) : (
          <Social siteMetadata={data.site.siteMetadata}>
            <HeartButton handleClick={() => navigate("/")} isStar={isStar} />
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
          color={isStarStyle ? "accent.contrastText" : undefined}
        >
          {data.site.siteMetadata.title}
        </Link>
        {isNotSmall ? null : (
          <Button
            variant="text"
            sx={{ minWidth: 0, padding: 0 }}
            onClick={() => {
              if (starStyle) {
                setIsStar(!isStar);
              } else {
                toggleOpen();
              }
            }}
          >
            <Typography
              color={isStarStyle ? "accent.contrastText" : undefined}
              fontWeight={isStarStyle ? "bold" : undefined}
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
            variant: isNotSmall ? "h5" : !isStarStyle ? "h4" : "h3",
            sx: !isStarStyle
              ? undefined
              : {
                "-webkit-text-fill-color": "black",
                "-webkit-text-stroke-width": "1px",
                "-webkit-text-stroke-color": "white",
              },
            component: "div"
          }}
        >
          {!isOpen ? null : <Social siteMetadata={data.site.siteMetadata} />}
        </HeaderLinks>
      )}
    </Stack>
  );
};

export default Header;
