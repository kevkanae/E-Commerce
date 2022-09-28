import {
  Flex,
  Text,
  chakra,
  Button,
  Divider,
  Image,
  IconButton,
  useToast,
  Box,
} from "@chakra-ui/react";
import Forms from "../components/Auth/Forms";
import { useNavigate } from "react-router-dom";
import { CustomDivider } from "../components/Auth/Divider";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineUserAdd } from "react-icons/ai";
import Card from "../assets/auth/laptop-gift.png";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { LoginMutation } from "../query/auth/Login.mutation";
import { useMutation } from "urql";
import { useCallback, useState } from "react";
import { ILogin } from "../interfaces/Auth";
import { MotionImg } from "../shared/Motion";

interface IFormData {
  email: string;
  password: string;
}

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState<IFormData>({
    email: "",
    password: "",
  });

  const [loginState, loginHandler] = useMutation<ILogin>(LoginMutation);
  const { fetching } = loginState;

  const handleLogin = () => {
    loginHandler(form).then(({ data }) => {
      if (data) {
        if (data.login.error) {
          toast({
            title: data.login.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        } else {
          localStorage.setItem("ACCESS_KEY", data.login.data.token);
          localStorage.setItem("USER_EMAIL", data.login.data.email);
          toast({
            title: data.login.message,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    });
  };

  return (
    <Flex w="100vw" h={["100%", "100%", "100%", "100vh"]} overflowY="auto">
      <Flex
        h="full"
        w={["100%", "100%", "100%", "52%"]}
        align="center"
        justify="flex-start"
        direction="column"
        p={[1, 1, 3]}
        bg="bg.primary"
      >
        <Flex
          align="center"
          alignSelf="flex-start"
          justify="space-evenly"
          color="teal.dark"
          _hover={{
            color: "teal.main",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          <IconButton
            borderRadius="50%"
            variant="PrimaryButton"
            aria-label="Back to Home"
            fontSize="1.4rem"
            icon={<ArrowBackIcon color={"text.main"} />}
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
            color="text.main"
            letterSpacing={1}
            textTransform="uppercase"
            mb={5}
          >
            Welcome Back
          </Text>
          <Text mb={5} color="text.light">
            If You are Already a Member, You can Login Here
          </Text>
          <Box mb={3}>
            <Forms<IFormData>
              fetching={fetching}
              form={form}
              setForm={setForm}
              authHandler={handleLogin}
              isSignup={false}
            />
          </Box>
          <CustomDivider />
          <Flex w="full" align="center" justify="center" my={2}>
            <Text
              onClick={() => navigate("/signup")}
              color="teal.main"
              _hover={{
                color: "teal.secondary",
                cursor: "pointer",
              }}
            >
              Don't Have an Account? Sign Up!
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        display={["none", "none", "none", "flex"]}
        h="full"
        alignItems={"center"}
        justifyContent="center"
        w="48%"
        bg="bg.main"
      >
        <MotionImg
          width={"80%"}
          height="80%"
          src={Card}
          animate={{ y: [-7, 7] }}
          // @ts-ignore
          transition={{
            duration: 3,
            type: "ease-in-out",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </Flex>
    </Flex>
  );
};

export default Login;
