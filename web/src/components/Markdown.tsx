import * as React from "react";
import showdown from "showdown";
import { Typography, TypographyProps } from "@mui/material";

const Markdown: React.FC<
  TypographyProps & {
    children: string;
  }
> = ({ children: content, ...props }) => {
  const converter = React.useMemo(() => new showdown.Converter(), []);
  return (
    <Typography
      {...props}
      dangerouslySetInnerHTML={{
        __html: converter.makeHtml(content),
      }}
    />
  );
};

export default Markdown;
