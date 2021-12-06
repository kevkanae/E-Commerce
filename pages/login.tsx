import React from "react";
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
} from "@chakra-ui/react";
const Login = () => {
  return (
    <Box w={"100vw"} h={"100vh"} backgroundColor={"pink"} position={"relative"}>
      <Box
        display={"flex"}
        h={"100%"}
        w={"100%"}
        boxShadow={"0 .1rem .2rem rgba(0,0,0,.4)"}
        bg={"transparent"}
      >
        <Box
          w="50%"
          h={"100%"}
          display={"grid"}
          placeItems={"center"}
          backgroundColor={"white"}
          // position={"relative"}
          overflow={"hidden"}
        >
          {/* <Image
            position={"absolute"}
            top={"-20%"}
            alt="curve-svg"
            src={"/upperC.svg"}
          /> */}
          <Box
            zIndex={2}
            w={"80%"}
            bg={"white"}
            boxShadow={"0 .5rem .5rem rgba(0,0,0,.4)"}
            borderRadius={"1rem"}
            p={4}
          >
            <Text mt={"1rem"} fontFamily="Pacifico" fontSize="2xl" pb={4}>
              Log-IN
            </Text>

            <Text pb={2} fontSize={".8rem"}>
              Welcome back,please log in to continue
            </Text>
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                borderRadius={"none"}
                borderLeft="2px solid rgb(144, 143, 234)"
                required
                // w={"md"}
                id="email"
                type="email"
                placeholder="Email"
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
                id="password"
                type="password"
                borderRadius={"none"}
                placeholder="password"
                _focus={{
                  borderLeft: "2px solid rgb(30, 27, 162 )",
                }}
              />

              <Button mx={"auto"} my={2} type="submit" bg={"blue.100"}>
                Sign Up
              </Button>
            </FormControl>
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
          display={"flex"}
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
        // zIndex={"-1"}
      />
    </Box>
  );
};

export default Login;
