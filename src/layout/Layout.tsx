import { Flex } from "@chakra-ui/react";
import { useOutlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const Layout = () => {
  const outlet = useOutlet();
  return (
    <Flex w="full" direction="column" position="relative" overflowY="auto">
      <Navbar />
      {outlet}
    </Flex>
  );
};

export default Layout;
