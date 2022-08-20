import { Box, Flex, Image, Text } from "@chakra-ui/react";
import BG from "../../assets/bg.jpg";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box w="full" position="relative" h="100vh">
        <Image
          src={BG}
          alt="Background"
          h="77vh"
          w="full"
          loading="lazy"
          objectFit="cover"
        />
        <Flex
          w="100%"
          position="absolute"
          left={0}
          bottom={{
            base: 0,
            md: 4,
          }}
          align="center"
          justify="space-between"
          px={{
            base: 2,
            md: 5,
          }}
        >
          <Text
            ml={{
              base: 0,
              md: 14,
            }}
            fontSize={{
              base: "3.6rem",
              md: "5.6rem",
            }}
            fontWeight={700}
            lineHeight={1.4}
            letterSpacing={1}
          >
            Wear the <br />
            <Text as="span" color="teal.800">
              Best
            </Text>
          </Text>

          <Flex
            bg="gray.200"
            fontSize={{
              base: "1.2rem",
              md: "2.1rem",
            }}
            p={{
              base: 2,
              md: 4,
            }}
            align="center"
            transition="0.3s cubic-bezier(0.47, 0, 0.745, 0.715)"
            cursor="pointer"
            _hover={{
              bg: "teal.800",
              color: "white",
              filter: "drop-shadow(0 0 2em #adebebaa)",
            }}
            onClick={() => navigate("/feed", { replace: true })}
          >
            <Text
              mr={{
                base: 7,
                md: 14,
              }}
              fontWeight={700}
              lineHeight={1.4}
              letterSpacing={1}
            >
              Shop now
            </Text>
            <BsBoxArrowInUpRight size={20} />
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Landing;
