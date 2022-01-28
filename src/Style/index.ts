import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import "@fontsource/open-sans";
import "@fontsource/ubuntu";

const breakpoints = createBreakpoints({
  sm: "320px",
  md: "768px",
  lg: "1200px",
  xl: "1400px",
});

const customTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },

  fonts: {
    body: "Ubuntu",
    heading: "Open Sans",
  },

  breakpoints,
});

export default customTheme;
