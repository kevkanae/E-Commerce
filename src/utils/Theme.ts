import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "../shared/Button";

export const scrollBarStyles = {
  "&::-webkit-scrollbar": {
    width: "0.7rem",
    height: "0.7rem",
  },
  "&::-webkit-scrollbar-track": {
    bg: "red",
  },
  "&::-webkit-scrollbar-thumb": {
    bg: "#b8b8b8",
    borderRadius: "1.4rem",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    bg: "#929292",
  },
};

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

export const theme = extendTheme({
  fonts: {
    body: `'Poppins', sans-serif`,
  },
  breakpoints,
  components: {
    Button,
  },
  colors: {
    bg: {
      main: "#16161A", //Dark Black
      primary: "#242629", //Light Black
      secondary: "#010101", //Darker Black
    },
    teal: {
      dark: "#234E52", //Teal.800
      main: "#319795", //Teal.500
      primary: "#38B2AC", //Teal.400
      secondary: "#4FD1C5", //Teal.300
    },
    text: {
      main: "#FFFFFE", //White
      primary: "#94A1B2", //Gray
      secondary: "#72757E", //Dim Gray
      light: "#E6FFFA", //Teal.50
    },
  },
});
