import { Text, Flex, Divider } from "@chakra-ui/react";
import { BsTwitter } from "react-icons/bs";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { IconBody } from "../components/IconBody";
import { clearState } from "../redux/reducers/AuthUser";
import { store } from "../redux/Store";
const Footer = () => {
  const onClick = () => {
    store.dispatch(clearState());
  };

  return (
    <Flex
      h="200px"
      // position={"absolute"}
      // pt={"4rem"}
      // bottom={"0"}
      flexDirection={"column"}
      alignItems={"center"}
      bg={"black"}
      w="full"
    >
      <Flex
        gap={".5rem"}
        height={"5rem"}
        justifyContent={"center"}
        width={"full"}
        alignItems={"center"}
        fontSize={"1rem"}
      >
        <Text fontSize={".6rem"} textColor={"white"}>
          JOIN US ON
        </Text>
        <IconBody bg={"#3b5998"}>
          <FiFacebook />
        </IconBody>
        <IconBody bg={"#55acee"}>
          <BsTwitter />
        </IconBody>

        <IconBody bg={"white"}>
          <FiInstagram />
        </IconBody>
      </Flex>
      <Divider h={"1px"} bg={"white"} />
      <Flex
        height={"100px"}
        justifyContent={"center"}
        alignItems={"center"}
        textColor={"white"}
        fontSize={"1.4rem"}
        fontFamily={"pacifico"}
      >
        Use . Kart
      </Flex>
    </Flex>
  );
};

export default Footer;
