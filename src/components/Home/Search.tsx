import { Button, Flex, Input } from "@chakra-ui/react";
import { BsSearch } from "react-icons/bs";

interface ISearchProps {
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
  searchVal: string;
}

const Search = ({ setSearchVal, searchVal }: ISearchProps) => {
  return (
    <Flex bg="bg.main" w="77%" mt="14vh" align="center" justify="center">
      <Flex h="12vh" align="center" justify="center" py={2} px={4}>
        <BsSearch size={28} color="#E6FFFA" />
      </Flex>

      <Input
        h="12vh"
        border="none"
        color="text.main"
        autoComplete="false"
        borderLeft="1px solid"
        borderLeftColor="teal.dark"
        borderRadius={0}
        focusBorderColor="teal.dark"
        placeholder="Search Product"
        _hover={{
          borderLeftColor: "teal.main",
        }}
        onChange={(e) => setSearchVal(e.currentTarget.value)}
        value={searchVal}
      />

      <Button
        h="12vh"
        variant="PrimaryButton"
        color="text.main"
        borderRadius={0}
      >
        Search
      </Button>
    </Flex>
  );
};

export default Search;
