import { Avatar, HStack, Text } from "@chakra-ui/react";
import NavLinks from "./NavLinks";

const DesktopNavbar = () => {
  return (
    <>
      <HStack
        spacing="4.9rem"
        letterSpacing={2}
        display={{
          base: "none",
          md: "inline-flex",
        }}
      >
        <NavLinks />
        <Avatar name="" src="" size="sm" />
      </HStack>
    </>
  );
};

export default DesktopNavbar;
