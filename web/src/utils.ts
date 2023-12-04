/* eslint-disable import/prefer-default-export */
const fallbackFonts = ["Roboto", "Helvetica", "Arial", "sans-serif"];

export const getFontFamily = (...fonts: string[]) =>
  [...fonts, ...fallbackFonts].join(",");
