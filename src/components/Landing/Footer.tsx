import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        h="49vh"
        w="full"
        direction="column"
        align="center"
        justify="center"
        color="white"
        textTransform="uppercase"
        letterSpacing={2}
        bg="black"
      >
        <Text
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
    </>
  );
};

export default Footer;
