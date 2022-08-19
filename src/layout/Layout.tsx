import { Flex } from "@chakra-ui/react";
import Navbar from "./Navbar/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex w="full" direction="column" position="relative" overflowY="auto">
      <Navbar />
      {children}
    </Flex>
  );
};

export default Layout;
