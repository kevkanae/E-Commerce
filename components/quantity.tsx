import { Box, HStack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export const Quantity = () => {
  const [quantity, setquantity] = useState<number>(1);
  const onIncQuantity = () => {
    if (quantity >= 10) return;
    setquantity((q) => q + 1);
  };
  const onDecQuantity = () => {
    if (quantity <= 1) return;
    setquantity((q) => q - 1);
  };
  return (
    <HStack>
      <Box
        borderRadius={"3px"}
        border={"2px solid #231a02"}
        p={"2px 8px"}
        // cursor={"pointer"}
        // onClick={onDecQuantity}
      >
        -
      </Box>
      <Text>{quantity}</Text>
      <Box
        // cursor={"pointer"}
        borderRadius={"3px"}
        border={"2px solid #231a02"}
        p={"2px 8px"}
        onClick={onIncQuantity}
      >
        +
      </Box>
    </HStack>
  );
};
