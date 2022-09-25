import {
  Flex,
  Text,
  Button,
  Divider,
  chakra,
  Image,
  IconButton,
  useToast,
  Box,
} from "@chakra-ui/react";
import Forms from "../components/Auth/Forms";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { CustomDivider } from "../components/Auth/Divider";
import Card from "../assets/auth/addtocart.png";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useMutation } from "urql";
import { ISignUp } from "../interfaces/Auth";
import { SignupMutation } from "../query/auth/SignUp.mutation";

interface IFormData {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [form, setForm] = useState<IFormData>({
    name: "",
    email: "",
    password: "",
  });

  const [signupState, signupHandler] = useMutation<ISignUp>(SignupMutation);
  const { fetching } = signupState;

  const handleSignUp = () => {
    signupHandler(form).then(({ data }) => {
      if (data) {
        if (data.signup.error) {
          toast({
            title: data.signup.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
          });
        } else {
          localStorage.setItem("ACCESS_KEY", data.signup.data.token);
          localStorage.setItem("USER_EMAIL", data.signup.data.email);
          toast({
            title: data.signup.message,
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    });
  };

  return (
    <>
      <Flex w="100vw" minH="100vh" h={["auto", "100vh"]} overflowY="auto">
        <Flex
          display={["none", "none", "none", "flex"]}
          h="full"
          alignItems={"center"}
          justifyContent="center"
          w="48%"
          bg="bg.main"
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
            mt="10vh"
          >
            <Text
              fontWeight={600}
              fontSize="1.8rem"
              color="text.main"
              letterSpacing={1}
              textTransform="uppercase"
              mb={5}
            >
              Welcome
            </Text>
            <Text mb={5} color="text.light">
              If You are not a Member, You can Sign Up Here
            </Text>
            <Box mb={3}>
              <Forms<IFormData>
                fetching={fetching}
                authHandler={handleSignUp}
                form={form}
                setForm={setForm}
                isSignup={true}
              />
            </Box>
            <CustomDivider />
            <Flex w="full" align="center" justify="center" mt={2}>
              <Text
                onClick={() => navigate("/login")}
                color="teal.main"
                _hover={{
                  color: "teal.secondary",
                  cursor: "pointer",
                }}
              >
                Already Have an Account? Login!
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Signup;
