import { Box } from "@chakra-ui/react";
import React from "react";

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
