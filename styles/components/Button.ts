import { Theme } from "../../node_modules/@chakra-ui/theme/dist/types";
import { mode, darken, whiten } from "@chakra-ui/theme-tools";

export const ButtonStyles = {
  variants: {
    primary: (props: Theme) => ({
      bg: "beta",
      _hover: {
        bg: mode(darken("beta", 20), whiten("beta", 20))(props),
        boxShadow: "md",
      },
    }),
  },
};
