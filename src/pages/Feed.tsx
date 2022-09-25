import { Button, Flex, Input } from "@chakra-ui/react";
import ProductGrid from "../components/Feed/ProductGrid";
import Search from "../components/Feed/Search";

const Feed = () => {
  return (
    <Flex
      w="full"
      minH="100vh"
      position="relative"
      bg="bg.primary"
      direction="column"
      align="center"
    >
      <Search />
      <ProductGrid />
    </Flex>
  );
};

export default Feed;
