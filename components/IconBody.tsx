import {
  BackgroundProps,
  Box,
  Colors,
  RecursiveProperty,
  ResponsiveValue,
} from "@chakra-ui/react";
import { Union } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import React, { Children, ReactElement } from "react";

export const IconBody = ({ bg, children }: { bg: string; children: any }) => {
  return (
    <Box
      width={"2rem"}
      height={"2rem"}
      bg={bg}
      borderRadius={"100%"}
      display={"grid"}
      placeItems={"center"}
    >
      {children}
    </Box>
  );
};
