import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        h="100vh"
        w="full"
        align="center"
        direction="column-reverse"
        position="relative"
      >
        <Flex
          bg="black"
          h="63vh"
          w="full"
          direction="column"
          align="center"
          justify="space-evenly"
          color="white"
          textTransform="uppercase"
          letterSpacing={2}
        >
          <Text
            mt="24vh"
            fontWeight={600}
            fontSize="2.1rem"
            cursor="pointer"
            _hover={{
              filter: "drop-shadow(0 0 2em #646cffaa)",
            }}
            onClick={() => navigate("/")}
          >
            <Text as="span" color="teal.600">
              X
            </Text>
            KART
          </Text>
          <Text>© Copyright {new Date().getFullYear()} - Kevin D Goveas</Text>
        </Flex>
        <Flex
          w="70%"
          h="49vh"
          bg="whitesmoke"
          position="absolute"
          left="50%"
          top="35%"
          transform="translate(-50%,-50%)"
          zIndex={777}
        ></Flex>
      </Flex>
    </>
  );
};

export default Footer;
