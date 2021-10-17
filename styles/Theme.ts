import { extendTheme } from "@chakra-ui/react";
import { ButtonStyles as Button } from "./components/Button";
import { mode, darken, whiten } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      body: {
        color: mode("#000", "#fff")(props),
        bg: mode("white", "black")(props),
        lineHeight: "1.4rem",
        boxSizing: "border-box",
      },
    }),
  },
  fonts: {
    body: "Poppins",
  },
  colors: {
    white: "#F9F9F9",
    black: "#3F4756",
    gray: "#A3ABBD",
    alpha: "#B9D2FF",
    beta: "#F4B6C4",
    gamma: "#BB808F",
  },
  components: {
    Button,
  },
  config,
});
