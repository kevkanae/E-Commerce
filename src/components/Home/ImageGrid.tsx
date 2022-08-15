import { Box, Flex, Image, Text } from "@chakra-ui/react";
import BG from "../../assets/bg.jpg";

const ImageGrid = () => {
  return (
    <>
      <Flex
        display={{
          base: "none",
          md: "flex",
        }}
        h="100vh"
        w="full"
        align="center"
        justify="center"
        position="relative"
      >
        <Box h="77vh" w="48%" mr={3}>
          <Image
            borderRadius="0.4rem"
            src="https://picsum.photos/777"
            alt=""
            h="full"
            w="full"
            loading="lazy"
            objectFit="cover"
          />
        </Box>
        <Flex
          h="77vh"
          w="30%"
          align="center"
          direction="column"
          justify="space-between"
        >
          <Box h="37vh" w="full">
            <Image
              borderRadius="0.4rem"
              src="https://picsum.photos/777"
              alt=""
              h="full"
              w="full"
              loading="lazy"
              objectFit="cover"
            />
          </Box>
          <Box h="37vh" w="full">
            <Image
              borderRadius="0.4rem"
              src="https://picsum.photos/777"
              alt=""
              h="full"
              w="full"
              loading="lazy"
              objectFit="cover"
            />
          </Box>
        </Flex>
        <Flex
          h="10rem"
          w="10rem"
          bg="teal.800"
          borderRadius="50%"
          position="absolute"
          left="59%"
          top="50%"
          transform="translate(-50%,-50%)"
          zIndex={777}
          align="center"
          justify="center"
          _hover={{
            cursor: "pointer",
            filter: "drop-shadow(0 0 2em #adebebaa)",
          }}
        >
          <Text fontWeight={600} color="white" letterSpacing={2}>
            Be your Best
          </Text>
        </Flex>
      </Flex>
    </>
  );
};
export default ImageGrid;
