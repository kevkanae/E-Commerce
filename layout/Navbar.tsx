import { Text, Flex, IconButton, Button, useColorMode } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      h={["24vh", "12vh"]}
      w="100vw"
      p="2.1rem"
      direction={["column", "row", "row"]}
      align="center"
      justify={["center", "space-between"]}
      className="nav"
    >
      <Text textAlign={["center", "start"]} w={["100%", "44%", "42%"]}>
        Use|Kart
      </Text>
      <Flex
        w={["100%", "56%", "49%"]}
        pt={[4, 0]}
        align="center"
        justify="end"
        className="nav__items"
      >
        <Text w={["33%", "21%"]} textAlign="center" mr="1.4rem">
          <a href="mailto:kevkanae777@gmail.com">Contact</a>
        </Text>
        <Text w={["33%", "21%"]} textAlign="center">
          <a href="https://github.com/kevkanae/Chat-App">Contribute</a>
        </Text>
        <IconButton
          w={["21%", "14%"]}
          variant="secondary"
          ml="2.4rem"
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label="Theme Switcher"
        />
      </Flex>
    </Flex>
  );
};

export default Navbar;
