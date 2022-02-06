import React, { useEffect, useState } from "react";
import {
  Box,
  Image,
  Text,
  Input,
  HStack,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../redux/services/UserLogin.services";
import { RootState, store } from "../redux/Store";
import Router from "next/router";
import AlertDail from "../components/ErrorModal";

interface inputData {
  email: string;
  password: string;
}
const Login = () => {
  const [formdata, setFormData] = useState<inputData>({
    email: "",
    password: "",
  });
  const onChangeData = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => {
      return {
        ...data,
        [ev.target.id]: ev.target.value,
      };
    });
  };
  const {
    email,
    isError,
    isFetching,
    isSuccess,
    errorMessage,
    isAuthenticated,
  } = useSelector((state: RootState) => state.user);

  const onSubmitForm = (ev: React.SyntheticEvent) => {
    ev.preventDefault();

    store.dispatch(
      loginUser({
        email: formdata.email,
        password: formdata.password,
      })
    );
  };
  useEffect(() => {
    if (isAuthenticated) Router.push("/");
  }, [isAuthenticated]);

  const toast = useToast();

  return (
    <Box w={"100vw"} h={"100vh"} backgroundColor={"pink"} position={"relative"}>
      {isError && <AlertDail message="login is not successfull"></AlertDail>}
      <Box
        display={"flex"}
        h={"100%"}
        w={"100%"}
        boxShadow={"0 .1rem .2rem rgba(0,0,0,.4)"}
        bg={"transparent"}
      >
        <Box
          w={["100%", "100%", "50%"]}
          h={"100%"}
          display={"grid"}
          placeItems={"center"}
          backgroundColor={"white"}
          // position={"relative"}
          overflow={"hidden"}
        >
          <Box
            zIndex={2}
            w={"80%"}
            bg={"white"}
            boxShadow={"0 .5rem .5rem rgba(0,0,0,.4)"}
            borderRadius={"1rem"}
            p={4}
          >
            <Text mt={"1rem"} fontFamily="Pacifico" fontSize="2xl" pb={4}>
              Log-In
            </Text>

            <Text pb={2} fontSize={".8rem"}>
              Welcome back,please log in to continue
            </Text>
            <form onSubmit={onSubmitForm}>
              <FormControl>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Input
                  borderRadius={"none"}
                  borderLeft="2px solid rgb(144, 143, 234)"
                  required
                  // w={"md"}
                  id="email"
                  type="email"
                  onChange={onChangeData}
                  placeholder=""
                  _focus={{
                    borderLeft: "2px solid rgb(30, 27, 162 )",
                  }}
                />
                <FormHelperText fontSize={".7rem"}>
                  {"We'll never share your email."}
                </FormHelperText>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  // w={"md"}
                  display={"block"}
                  borderLeft="2px solid rgb(144, 143, 234)"
                  required
                  onChange={onChangeData}
                  id="password"
                  type="password"
                  borderRadius={"none"}
                  placeholder="password"
                  _focus={{
                    borderLeft: "2px solid rgb(30, 27, 162 )",
                  }}
                />
                {isError && <FormHelperText>{errorMessage}</FormHelperText>}
                <Button
                  isLoading={isFetching}
                  mx={"auto"}
                  my={2}
                  type="submit"
                  bg={"blue.100"}
                >
                  Sign Up
                </Button>
              </FormControl>
            </form>
            <Text textAlign={"center"} className="login__or">
              OR{" "}
            </Text>
            <HStack p={2} justifyContent={"space-evenly"}>
              <Text fontWeight={"bold"} className="login__google">
                <span>G</span>
                <span>o</span>
                <span>o</span>
                <span>g</span>
                <span>l</span>
                <span>e</span>
              </Text>
              <Text fontWeight={"bold"} color={"rgb(36, 32, 251)"}>
                facebook
              </Text>
            </HStack>
          </Box>
        </Box>
        <Box
          w="50%"
          display={["none", "none", "flex"]}
          placeItems={"center"}
          flexDirection={"column"}
          justifyContent={"center"}
          style={{
            columnGap: "2rem",
          }}
          h={"100%"}
          backgroundColor={"white"}
        >
          <Text mt={"1rem"} fontFamily="Pacifico" fontSize="4xl" pb={4}>
            Use.Kart
          </Text>
          <Image zIndex={2} w={"50%"} alt="shopping" src="/login-svg.svg" />
        </Box>
      </Box>
      <Image
        bottom={"0"}
        w="100%"
        position={"absolute"}
        alt="curve-svg"
        src={"/lowerC.svg"}
      />
    </Box>
  );
};

export default Login;
