import {
  Flex,
  Text,
  chakra,
  Button,
  Divider,
  Image,
  IconButton,
} from "@chakra-ui/react";
import Forms from "../components/Auth/Forms";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { CustomDivider } from "../components/Auth/Divider";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineUserAdd } from "react-icons/ai";
import Card from "../assets/auth/laptop-gift.png";

import { BsBack } from "react-icons/bs";
import { ArrowBackIcon } from "@chakra-ui/icons";
const Login = () => {
  const navigate = useNavigate();
  return (
    <Flex w="100vw" h={["100%", "100%", "100%", "100vh"]} overflowY="auto">
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
            Welcome Back
          </Text>
          <Text mb={5} color={"text"}>
            If you are already a member you can login here
          </Text>
          <chakra.div mb={"1rem"}>
            <Forms isSignup={false} />
          </chakra.div>
          <CustomDivider />
          <Button
            w={"full"}
            leftIcon={<FcGoogle />}
            bg="heading"
            variant="solid"
          >
            Login with Google
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
              Don't have an Account?
            </Text>
            <Button
              bg="tertiary"
              fontSize={"sm"}
              color={"buttonText"}
              leftIcon={<AiOutlineUserAdd />}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
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
    </Flex>
  );
};

export default Login;
