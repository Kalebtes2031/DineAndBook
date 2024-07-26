// src/theme/index.js or src/theme.js
import { extendTheme, Text } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Markazi Text', serif",
  },
  letterSpacings: {
    heading: "2px",
  },
  textStyles: {
    Heading: {
      fontSize: "4rem",
      mt: "1.5rem",
      mb: 0,
    },
    Text: {
      fontFamily: "Karla', sans-serif",
    },
    // Define other heading styles if needed
  },
});

export default theme;
