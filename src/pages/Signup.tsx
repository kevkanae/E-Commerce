import {
  Flex,
  Text,
  Button,
  Divider,
  chakra,
  Image,
  IconButton,
} from "@chakra-ui/react";
import Forms from "../components/Auth/Forms";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { CustomDivider } from "../components/Auth/Divider";
import Card from "../assets/auth/addtocart.png";
import { ArrowBackIcon } from "@chakra-ui/icons";
const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <Flex
        w="100vw"
        minH={"100vh"}
        h={["auto", "auto", "auto", "100vh"]}
        overflowY="auto"
      >
        {/* <Flex
          position="relative"
          h="full"
          w="48%"
          align="center"
          justify="center"
          bg="gray.100"
        >
          <Flex h="210px" w="210px" bg="teal.500" borderRadius="50%"></Flex>
          <Flex
            position="absolute"
            h="48vh"
            w="full"
            bg="white.50"
            bottom={0}
            left={0}
            backdropFilter="blur(0.7rem)"
          />
        </Flex> */}
        <Flex
          display={["none", "none", "none", "flex"]}
          h="full"
          alignItems={"center"}
          justifyContent="center"
          w="48%"
          bg="background.pri"
        >
          <Image width={"80%"} height="80%" src={Card} />
        </Flex>
        <Flex
          h="full"
          w={["100%", "100%", "100%", "52%"]}
          align="center"
          justify="flex-start"
          direction="column"
          p={[1, 1, 3]}
          bg="background.sec"
        >
          <Flex
            alignSelf="flex-start"
            onClick={() => navigate(-1)}
            align="center"
            justify="space-evenly"
            color="teal.800"
            _hover={{
              color: "teal.600",
              cursor: "pointer",
            }}
          >
            <IconButton
              borderRadius={"100%"}
              bg="tertiary"
              aria-label="Call Sage"
              fontSize="20px"
              icon={<ArrowBackIcon color={"buttonText"} />}
            />
          </Flex>
          <Flex
            direction="column"
            align="flex-start"
            justify="space-evenly"
            w="63%"
            mt="17vh"
          >
            <Text
              fontWeight={600}
              fontSize="1.8rem"
              color={"heading"}
              letterSpacing={"2px"}
              textTransform="uppercase"
              mb={5}
            >
              Welcome
            </Text>
            <Text mb={5} color={"text"}>
              If you are not a member you can signup here
            </Text>
            <chakra.div mb={"1rem"}>
              <Forms isSignup={true} />
            </chakra.div>
            <CustomDivider />
            <Button
              w={"full"}
              leftIcon={<FcGoogle />}
              bg="heading"
              variant="solid"
            >
              Signin with Google
            </Button>

            <Divider my={5} />
            <Flex w="full" justifyContent={"space-between"} alignItems="center">
              <Text
                color={"text"}
                _hover={{
                  color: "teal.600",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/signup")}
              >
                Already have an account
              </Text>
              <Button
                bg="tertiary"
                fontSize={"sm"}
                color={"buttonText"}
                leftIcon={<AiOutlineUser />}
              >
                Login
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Signup;
