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
            fontSize={{
              base: "1.4rem",
              md: "2.1rem",
            }}
            cursor="pointer"
            _hover={{
              filter: "drop-shadow(0 0 2em #646cffaa)",
            }}
            onClick={() => navigate("/")}
            letterSpacing={2}
          >
            <Text as="span" color="teal.600">
              X
            </Text>
            KART
          </Text>
          <Text
            fontSize={{
              base: "0.75rem",
              md: "0.875rem",
            }}
          >
            © Copyright {new Date().getFullYear()} - Kevin D Goveas
          </Text>
        </Flex>
        <Flex
          w={{
            base: "84%",
            md: "70%",
          }}
          borderRadius="0.25rem"
          h="49vh"
          bg="whitesmoke"
          position="absolute"
          left="50%"
          top="35%"
          transform="translate(-50%,-50%)"
          zIndex={777}
          align="center"
          justify="center"
        >
          Carousel
        </Flex>
      </Flex>
    </>
  );
};

export default Footer;
