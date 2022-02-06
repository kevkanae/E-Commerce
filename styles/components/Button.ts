import { Theme } from "../../node_modules/@chakra-ui/theme/dist/types";
import { mode, darken, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  variants: {
    primary: (props: Theme) => ({
      bg: mode("beta", darken("beta", 20))(props),
      _hover: {
        bg: mode(darken("beta", 7), darken("beta", 28))(props),
        boxShadow: "md",
      },
    }),
    secondary: (props: Theme) => ({
      bg: mode("alpha", darken("alpha", 20))(props),
      _hover: {
        bg: mode(darken("alpha", 7), darken("alpha", 28))(props),
        boxShadow: "md",
      },
    }),
    tertiary: (props: Theme) => ({
      bg: "whitee",
      _hover: {
        bg: mode(darken("whitee", 7), darken("white", 20))(props),
        boxShadow: "sm",
      },
    }),
  },
  noStyle: (props: Theme) => ({
    bg: "whitee",
    _hover: {
      bg: mode(darken("whitee", 7), darken("white", 20))(props),
      boxShadow: "sm",
      outline: "none",
      border: "none",
    },
    _focus: {
      outline: "none",
      border: "none",
    },
  }),
};
