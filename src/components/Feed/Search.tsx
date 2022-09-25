import { Button, Flex, Input } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <Flex bg="bg.main" w="77%" mt="14vh" align="center" justify="center">
      <Flex h="12vh" align="center" justify="center" py={2} px={4}>
        <BsSearch size={28} color="white" />
      </Flex>

      <Input
        h="12vh"
        border="none"
        color="#EEE"
        autoComplete="false"
        borderLeft="1px solid #242629"
        borderRadius={0}
        focusBorderColor="#242629"
        placeholder="Search Product"
        _hover={{
          borderLeftColor: "#242629",
        }}
      />

      <Button h="12vh" bg="button" color="white" borderRadius={0}>
        Search
      </Button>
    </Flex>
  );
};

export default Search;
