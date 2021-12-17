import { Text, Flex, IconButton, useColorMode, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { BiCart } from "react-icons/bi";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      h="10vh"
      w="100vw"
      px={4}
      direction="row"
      align="center"
      justify="space-between"
      className="nav"
    >
      <Flex
        w="50%"
        align="center"
        justify="space-between"
        className="nav__items"
      >
        <Text fontFamily="Pacifico" fontSize="2xl" textAlign="start">
          Use • Kart
        </Text>
      </Flex>
      <Flex
        w={["46%", "35%", "25%", "17%"]}
        align="center"
        justify="space-between"
        className="nav__items"
      >
        <Button letterSpacing={1} variant="secondary">
          {isAuthenticated ? (
            <Button
              onClick={() => {
                localStorage.removeItem("token");
              }}
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </Button>
        <IconButton aria-label="Cart" icon={<BiCart />} variant="secondary" />
        <IconButton
          aria-label="Theme Switcher"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          variant="primary"
          onClick={toggleColorMode}
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
