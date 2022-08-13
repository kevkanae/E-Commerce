import { Box, Flex, Image, Text } from "@chakra-ui/react";
import BG from "../../assets/bg.jpg";
import { BsBoxArrowInUpRight } from "react-icons/bs";

const Landing = () => {
  return (
    <>
      <Box w="full" position="relative" minH="100vh">
        <Image
          src={BG}
          alt="Background"
          maxH="77vh"
          w="full"
          loading="lazy"
          objectFit="cover"
        />
        <Flex
          w="100%"
          position="absolute"
          left={0}
          bottom={4}
          align="center"
          justify="space-between"
          px={5}
        >
          <Text
            ml={14}
            fontSize="5.6rem"
            fontWeight={700}
            lineHeight={1.4}
            letterSpacing={1}
          >
            Wear the <br />
            <Text as="span" color="teal.800" ml={1}>
              Best
            </Text>
          </Text>

          <Flex
            bg="gray.200"
            fontSize="2.1rem"
            p={4}
            align="center"
            transition="0.3s cubic-bezier(0.47, 0, 0.745, 0.715)"
            cursor="pointer"
            _hover={{
              bg: "teal.800",
              color: "white",
              filter: "drop-shadow(0 0 2em #adebebaa)",
            }}
          >
            <Text mr={14} fontWeight={700} lineHeight={1.4} letterSpacing={1}>
              Shop now
            </Text>
            <BsBoxArrowInUpRight size={24} />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Landing;
