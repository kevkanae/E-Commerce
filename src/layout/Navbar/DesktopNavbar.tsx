import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
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
        <Menu>
          <MenuButton>
            <Avatar name="My Name" src="https://picsum.photos/777" />
          </MenuButton>
          <MenuList>
            <MenuItem>A</MenuItem>
            <MenuItem>B</MenuItem>
            <MenuItem>C</MenuItem>
            <MenuDivider />
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </>
  );
};

export default DesktopNavbar;
