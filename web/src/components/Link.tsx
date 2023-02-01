import * as React from "react";
import MuiLink from "@mui/material/Link";
import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby";

const Link = React.forwardRef<unknown, GatsbyLinkProps<unknown>>(
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
