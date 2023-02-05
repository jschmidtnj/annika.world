import * as React from "react";
import {
  Button,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HeaderLinks from "./HeaderLinks";
import { useStaticQuery, graphql } from "gatsby";
import { getFontFamily } from "../utils";

interface HeaderData {
  site: {
    siteMetadata: {
      title: string;
    };
  };
}

const Header: React.FC = () => {
  const [isClickedOpen, setIsClickedOpen] = React.useState(false);
  const [isStar, setIsStar] = React.useState(false);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.up("sm"));
  const isOpen = React.useMemo(
    () => isSmall || isClickedOpen,
    [isSmall, isClickedOpen]
  );
  const data = useStaticQuery<HeaderData>(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <Stack
      mt={4}
      mb={8}
      direction={{ md: "row" }}
      justifyContent="space-between"
      width="100%"
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
        <Button
          variant="text"
          onClick={() => setIsClickedOpen(!isClickedOpen)}
          sx={{ minWidth: 0, padding: 0 }}
        >
          <Typography
            color={isStar ? "accent.contrastText" : undefined}
            variant="h5"
            fontWeight={isStar ? "bold" : undefined}
          >
            ♡
          </Typography>
        </Button>
        <Typography
          fontWeight="bold"
          textTransform="uppercase"
          fontFamily={getFontFamily("Secular One")}
          variant="h4"
          whiteSpace="nowrap"
          color={isStar ? "accent.contrastText" : undefined}
        >
          {data.site.siteMetadata.title}
        </Typography>
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
      </Stack>
      {!isOpen ? null : (
        <HeaderLinks
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "center", sm: "flex-end" }}
          linkProps={{
            textAlign: "center",
            variant: isSmall ? "h5" : !isStar ? "h4" : "h3",
            sx: !isStar
              ? undefined
              : {
                  "-webkit-text-fill-color": "black",
                  "-webkit-text-stroke-width": "1px",
                  "-webkit-text-stroke-color": "white",
                },
          }}
        />
      )}
    </Stack>
  );
};

export default Header;
