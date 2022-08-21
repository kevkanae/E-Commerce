import {
  Avatar,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useToken } from "../../services/useToken.Hook";
import NavLinks from "./NavLinks";

const DesktopNavbar = () => {
  const token: string | null = useToken();

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
        {token && (
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
        )}
      </HStack>
    </>
  );
};

export default DesktopNavbar;
