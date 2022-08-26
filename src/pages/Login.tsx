import { Flex, Text, Input } from "@chakra-ui/react";
import Forms from "../components/Auth/Forms";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <Flex w="100vw" h="100vh" overflowY="auto">
      <Flex
        h="full"
        w="52%"
        align="center"
        justify="flex-start"
        direction="column"
        p={3}
      >
        <Flex
          alignSelf="flex-start"
          onClick={() => navigate("/")}
          align="center"
          justify="space-evenly"
          color="teal.800"
          _hover={{
            color: "teal.600",
            cursor: "pointer",
          }}
        >
          <IoIosArrowBack />
          <Text>Go Back</Text>
        </Flex>
        <Flex
          direction="column"
          align="flex-start"
          justify="space-evenly"
          w="63%"
          mt="17vh"
        >
          <Text fontWeight={600} fontSize="1.4rem" mb={5}>
            Welcome Back
          </Text>
          <Forms isSignup={false} />
        </Flex>
        <Text
          color="teal.800"
          _hover={{
            color: "teal.600",
            cursor: "pointer",
          }}
          onClick={() => navigate("/signup")}
        >
          Don't have an Account?
        </Text>
      </Flex>
      <Flex
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
      </Flex>
    </Flex>
  );
};

export default Login;
