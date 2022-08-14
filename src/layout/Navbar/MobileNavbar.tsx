import { Box, CloseButton, IconButton, VStack } from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/ai";
import NavLinks from "./NavLinks";

export interface IDisclosureProps {
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
}

const MobileNavbar = ({ onOpen, isOpen, onClose }: IDisclosureProps) => {
  return (
    <>
      <Box
        display={{
          base: "inline-flex",
          md: "none",
        }}
        transition="0.3s cubic-bezier(0.47, 0, 0.745, 0.715)"
      >
        <IconButton
          display={{
            base: "flex",
            md: "none",
          }}
          aria-label="Open menu"
          fontSize="20px"
          color="gray.800"
          _dark={{
            color: "inherit",
          }}
          variant="ghost"
          icon={<AiOutlineMenu />}
          onClick={onOpen}
        />
        <VStack
          pos="absolute"
          top={0}
          left={0}
          right={0}
          display={isOpen ? "flex" : "none"}
          flexDirection="column"
          p={2}
          pb={4}
          m={2}
          bg={"white"}
          spacing={3}
          rounded="sm"
          shadow="sm"
        >
          <CloseButton
            aria-label="Close menu"
            justifySelf="self-start"
            onClick={onClose}
          />
          <NavLinks />
        </VStack>
      </Box>
    </>
  );
};

export default MobileNavbar;
