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
        bg: mode("whitee", "blackk")(props),
        lineHeight: "1.5rem",
        boxSizing: "border-box",
        overflowX: "hidden",
      },
    }),
  },
  fonts: {
    body: "Poppins",
  },
  colors: {
    whitee: "#F9F9F9",
    blackk: "#3F4756",
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
