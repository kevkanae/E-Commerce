import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import ProductGrid from "../components/Home/ProductGrid";
import Search from "../components/Home/Search";

const Home = () => {
  const [searchVal, setSearchVal] = useState<string>("");

  return (
    <Flex
      w="full"
      minH="100vh"
      position="relative"
      bg="bg.primary"
      direction="column"
      align="center"
    >
      <Search setSearchVal={setSearchVal} searchVal={searchVal} />
      <ProductGrid />
    </Flex>
  );
};

export default Home;
