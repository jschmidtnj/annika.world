import * as React from "react";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { GatsbyLinkProps, Link as GatsbyLink } from "gatsby";

const Link = React.forwardRef<unknown, MuiLinkProps & GatsbyLinkProps<unknown>>(
  (props, ref) => (
    <MuiLink
      component={GatsbyLink}
      // @ts-ignore
      ref={ref}
      {...props}
    >
      {props.children}
    </MuiLink>
  )
);

export default Link;
