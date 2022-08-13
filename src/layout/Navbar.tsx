import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <Flex
      w="100%"
      h="10vh"
      align="center"
      justify="space-between"
      py={1}
      px={5}
      zIndex={777}
      //Glassmorphism
      position="absolute"
      bg="white.50"
      backdropFilter="blur(0.2rem)"
    >
      <Text
        fontWeight={600}
        fontSize="1.4rem"
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
      <HStack spacing="4.9rem">
        <Text cursor="pointer" onClick={() => navigate("/category")}>
          Category
        </Text>
        <Text cursor="pointer" onClick={() => navigate("/feed")}>
          Shop
        </Text>
        <Text cursor="pointer" onClick={() => navigate("/contact")}>
          Contact Us
        </Text>
        <Avatar name="" src="" size="sm" />
      </HStack>
    </Flex>
  );
};

export default Navbar;
