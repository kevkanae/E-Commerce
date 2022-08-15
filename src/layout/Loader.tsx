import { Flex } from "@chakra-ui/react";
import { Jelly } from "@uiball/loaders";
const Loader = () => {
  return (
    <>
      <Flex h="100vh" w="100vw" align="center" justify="center">
        <Jelly size={80} speed={0.9} color="#B2D8D8" />
      </Flex>
    </>
  );
};

export default Loader;
