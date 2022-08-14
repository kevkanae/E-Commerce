import { Flex, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";

const Navbar = () => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();

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
        fontSize={"1.4rem"}
        cursor="pointer"
        onClick={() => navigate("/", { replace: true })}
        letterSpacing={2}
        transition="0.3s cubic-bezier(0.47, 0, 0.745, 0.715)"
        _hover={{
          color: "teal.400",
        }}
      >
        <Text as="span" color="teal.600">
          X
        </Text>
        KART
      </Text>

      <MobileNavbar onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
      <DesktopNavbar />
    </Flex>
  );
};

export default Navbar;
