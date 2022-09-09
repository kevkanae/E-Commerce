import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/auth/landing.png";
const Landing = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box w="full" position="relative" bg={"background.pri"} h="100vh">
        <Flex
          h={"100vh"}
          justifyContent="space-between"
          alignItems={"center"}
          gap="2rem"
        >
          <Box
            pb={"5rem"}
            alignSelf={"flex-end"}
            w={"40%"}
            color="white"
            pl="10"
          >
            <Text fontSize={"32px"} fontWeight="900">
              Get all your dressing need at one stop
            </Text>
            <Box pt={7} pb="">
              <Text lineHeight={"96px"} fontSize={"96px"} fontWeight="900">
                SHOP
              </Text>
              <Text
                display={"inline-block"}
                lineHeight={"75px"}
                bg={"button"}
                fontSize={"96px"}
                color="black"
                fontWeight="900"
              >
                NOW
              </Text>
            </Box>
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              variant="outline"
              mt={"2"}
            >
              Take me there
            </Button>
            {/* <Text textDecor={"underline"} color={"button"} mt={"4"}>
              {"take me there -> "}
            </Text> */}
          </Box>
          <Flex justifyContent={"flex-end"} alignSelf={"flex-end"} w={"60%"}>
            <Image w="90%" src={Img} />
          </Flex>
        </Flex>
        {/* <Image
          src="https://ucarecdn.com/80a5fddd-1f17-442f-8d8b-7c5fe06bfbc3/-/preview/-/quality/smart/"
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
            color="button"
            letterSpacing={1}
          >
            Wear the <br />
            <Text as="span" color="heading">
              Best
            </Text>
          </Text>

          <Flex
            bg="button"
            color={"buttonText"}
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
        </Flex> */}
      </Box>
    </>
  );
};

export default Landing;
