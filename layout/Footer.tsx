import { Text, Flex, IconButton, useColorMode, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { clearState } from "../redux/reducers/user";
import { store } from "../redux/Store";
const Footer = () => {
  const onClick = () => {
    store.dispatch(clearState());
  };

  return (
    <Flex h="10vh" w="full">
      <Text>
        <Button onClick={onClick}>Clear Store</Button>
      </Text>
    </Flex>
  );
};

export default Footer;
