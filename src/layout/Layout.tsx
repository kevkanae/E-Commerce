import { Flex } from "@chakra-ui/react";
import { useOutlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const outlet = useOutlet();
  return (
    <Flex w="100vw" h="100vh" overflowY="auto">
      <Navbar />
      {outlet}
    </Flex>
  );
};

export default Layout;
