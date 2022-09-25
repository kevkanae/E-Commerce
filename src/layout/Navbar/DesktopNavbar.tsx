import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../../services/useToken.Hook";
import NavLinks from "./NavLinks";

const DesktopNavbar = () => {
  const token = useToken();
  const navigate = useNavigate();
  console.log(token);

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
        {!token && (
          <Button
            variant="PrimaryButton"
            bg="teal.primary"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </Button>
        )}
        {token && (
          <Menu>
            <MenuButton>
              <Avatar
                name="My Name"
                size="sm"
                src="https://picsum.photos/777"
              />
            </MenuButton>
            <MenuList color={"black"}>
              <MenuItem>A</MenuItem>
              <MenuItem>B</MenuItem>
              <MenuItem>C</MenuItem>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </>
  );
};

export default DesktopNavbar;
