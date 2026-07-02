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
      sx={{ fontWeight: props.isStar ? "bold" : undefined }}
    >
      ♡
    </Typography>
  </Button>
);

const Social: React.FC<{
  siteMetadata: HeaderData["site"]["siteMetadata"];
  children?: React.ReactNode;
}> = (props) => (
  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
    {props.children}
    <ExternalLink target="_blank" href={props.siteMetadata.instagram} sx={{ pt: 1 }}>
      <InstagramIcon />
    </ExternalLink>
    <ExternalLink target="_blank" href={props.siteMetadata.soundcloud} sx={{ pt: 1 }}>
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
      direction={{ md: "row" }}
      {...props}
      sx={{
        py: 2,
        justifyContent: "space-between",
        width: "100%",
        ...props.sx,
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          width: {
            xs: "100%",
            sm: undefined,
          },
          justifyContent: {
            xs: "space-between",
            sm: "center",
            md: "flex-start",
          },
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
          variant="h4"
          underline="none"
          color={isStarStyle ? "accent.contrastText" : undefined}
          sx={{
            fontWeight: "bold",
            textTransform: "uppercase",
            fontFamily: getFontFamily("Secular One"),
            whiteSpace: "nowrap",
          }}
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
              variant="h5"
              sx={{ fontWeight: isStarStyle ? "bold" : undefined }}
            >
              ☆
            </Typography>
          </Button>
        )}
      </Stack>
      {!isOpen && !isNotSmall ? null : (
        <HeaderLinks
          direction={{ xs: "column", sm: "row" }}
          sx={{
            alignItems: { xs: "center", sm: "flex-end" },
          }}
          linkProps={{
            variant: isNotSmall ? "h5" : !isStarStyle ? "h4" : "h3",
            sx: {
              textAlign: "center",
              ...(!isStarStyle
                ? {}
                : {
                  "-webkit-text-fill-color": "black",
                  "-webkit-text-stroke-width": "1px",
                  "-webkit-text-stroke-color": "white",
                }),
            },
          }}
        >
          {!isOpen ? null : <Social siteMetadata={data.site.siteMetadata} />}
        </HeaderLinks>
      )}
    </Stack>
  );
};

export default Header;
