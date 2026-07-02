import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    accent: Palette["primary"] & {
      '100': string;
      '200': string;
      '300': string;
      '400': string;
      '500': string;
      light: string;
    };
  }
  interface PaletteOptions {
    accent?: Partial<Palette["accent"]>;
  }
}
