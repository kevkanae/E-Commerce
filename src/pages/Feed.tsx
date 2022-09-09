import { Box } from "@chakra-ui/react";
import Carousel from "../components/Feed/Carousel";

const Feed = () => {
  return (
    <>
      <Box w="full" h="100vh" bg={"background.sec"}>
        <Carousel />
      </Box>
    </>
  );
};

export default Feed;
