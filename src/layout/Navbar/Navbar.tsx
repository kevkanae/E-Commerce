import { Flex, FlexProps, Text, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import { usePathName } from "../../services/usePathname.Hook";

const Navbar = () => {
  const navigate = useNavigate();
  const { onOpen, isOpen, onClose } = useDisclosure();
  const path = usePathName();

  const FlexboxProps: FlexProps = {
    position: path === "/" || path === "/home" ? "absolute" : "static",
    bg: path === "/" ? "white.50" : "white.100",
    backdropFilter: path === "/" ? "blur(0.2rem)" : "none",
  };

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
      color={"white"}
      {...FlexboxProps}
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
