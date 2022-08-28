import {
  Box,
  FormControl,
  Input,
  Text,
  InputGroup,
  InputProps,
} from "@chakra-ui/react";
import React, { useState } from "react";

interface InputProp extends InputProps {
  value: string;
  handleChange: any;
}

export const CustomInput = (props: InputProp) => {
  // const [value, setValue] = useState("");
  const [isActive, setIsActive] = useState(false);

  return (
    <Box p="5">
      <Box pos="relative">
        <FormControl isRequired colorScheme="green">
          <InputGroup>
            <Input
              {...props}
              p="5"
              outline="none"
              onFocus={() => setIsActive(true)}
              onBlur={() =>
                props.value === "" ? setIsActive(false) : setIsActive(true)
              }
              value={props.value}
              onChange={props.handleChange}
            />
          </InputGroup>
        </FormControl>
        <Text
          top={isActive ? "0%" : "50%"}
          left={isActive ? "5px" : "50%"}
          transform={
            isActive
              ? "translate(10px,-45%) scale(0.8)"
              : "translate(-50%,-50%) scale(1)"
          }
          p="0 12px"
          bg="#fff"
          transformOrigin="top left"
          transition="all .2s ease-out"
          color="#999"
          pointerEvents="none"
          pos="absolute"
          w="fit-content"
          h="fit-content"
          zIndex="5"
        >
          {props.name}
        </Text>
      </Box>
    </Box>
  );
};
