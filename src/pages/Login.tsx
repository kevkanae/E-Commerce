import {
  Flex,
  Text,
  chakra,
  Button,
  Divider,
  Image,
  IconButton,
  useToast,
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
            bg="button"
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
            <Forms<IFormData>
              fetching={fetching}
              form={form}
              setForm={setForm}
              authHandler={handleLogin}
              isSignup={false}
            />
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
              bg="button"
              fontSize={"sm"}
              color={"buttonText"}
              leftIcon={<AiOutlineUserAdd />}
              onClick={() => navigate("/signup")}
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
