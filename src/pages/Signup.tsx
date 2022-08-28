import {
  Flex,
  Text,
  Button,
  Divider,
  chakra,
  Image,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import Forms from "../components/Auth/Forms";
import { useNavigate } from "react-router-dom";
import { AiOutlineUser, AiOutlineUserAdd } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { CustomDivider } from "../components/Auth/Divider";
import Card from "../assets/auth/addtocart.png";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useMutation } from "urql";
import { ISignUp } from "../interfaces/Auth";
import { SignUpQuery } from "../query/SignUp";

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
  /*
  code for Signup
  */
  const [signInRes, signIn] = useMutation<ISignUp>(SignUpQuery);
  const { data, fetching, error } = signInRes;
  const handleSignUp = async () => {
    signIn(form).then((_) => {
      if (error) {
        toast({
          title: "Something went wrong..",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        if (data?.signup.message === "User Exists") {
          toast({
            title: "User Exists",
            description: "Please login using password",
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        } else {
          toast({
            title: "Account created.",
            description: "We've created your account for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          localStorage.setItem("ACCESS_KEY", data?.signup.data.token as string);
        }
      }
    });
  };

  return (
    <>
      <Flex
        w="100vw"
        minH={"100vh"}
        h={["auto", "auto", "auto", "100vh"]}
        overflowY="auto"
      >
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
              Welcome
            </Text>
            <Text mb={5} color={"text"}>
              If you are not a member you can signup here
            </Text>
            <chakra.div mb={"1rem"}>
              <Forms<IFormData>
                fetching={fetching}
                authHandler={handleSignUp}
                form={form}
                setForm={setForm}
                isSignup={true}
              />
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
                onClick={() => navigate("/login")}
              >
                Already have an account
              </Text>
              <Button
                bg="button"
                fontSize={"sm"}
                color={"buttonText"}
                leftIcon={<AiOutlineUser />}
                onClick={() => navigate("/login")}
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
