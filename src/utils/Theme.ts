import { extendTheme } from "@chakra-ui/react";

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
  colors:{
    lightback:"#242629",
    background:{
      pri:"#16161a",
      sec:"#242629"
    },
    heading:"#fffffe",
    text:"#94a1b2",
    button:"#7f5af0",
    buttonText:"#fffffe",
    main:"#fffffe",
    secondary:"#72757e",
    tertiary:"#2cb67d",
    stroke:'#010101',
  },
});
