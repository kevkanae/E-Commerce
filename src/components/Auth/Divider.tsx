import { Box, Divider } from "@chakra-ui/react";
import React from "react";

export const CustomDivider = () => {
  return (
    <Box position={"relative"} w="full" my={2}>
      <Divider />
      <Box
        p={1}
        bg="bg.primary"
        color={"heading"}
        position={"absolute"}
        top="-15px"
        left={"50%"}
      >
        OR
      </Box>
    </Box>
  );
};
