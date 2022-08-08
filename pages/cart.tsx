import {
  Box,
  Flex,
  HStack,
  Text,
  VStack,
  Image,
  IconButton,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { FiDelete } from "react-icons/fi";
import Quantity from "../components/ChangeQuantity";
import Navbar from "../layout/Navbar";

const Cart = () => {
  return (
    <Box>
      <Navbar />
      <Box mt={"13vh"}>
        <Text fontWeight={600} textAlign="center" fontSize={"1.2rem"}>
          Your Cart
        </Text>
        <Flex
          flexDirection={["column", "column", "row"]}
          mt="2rem"
          alignItems={"flex-start"}
          justifyContent={"flex-start"}
        >
          <Flex flexDirection={"column"} w={["100%", "100%", "100%", "70%"]}>
            {[7, 7, 7, 7, 7].map((data, key) => {
              return (
                <Box key={key} mb={"1rem"} padding={"0 2rem"}>
                  <Flex
                    // margin={"2"}
                    width={"100%"}
                    // height="7rem"
                    border={"1px solid #000"}
                    borderRadius="5px"
                    padding="1rem"
                  >
                    <Image w={"8%"} src="/prod.png" alt="hello " />
                    <HStack
                      w={"92%"}
                      justifyContent="space-between"
                      alignItems={"center"}
                    >
                      <VStack
                        pl={"1rem"}
                        justifyContent={"flex-start"}
                        alignItems="flex-start"
                      >
                        <Box fontWeight={"600"}>Nike Airmax 270 react</Box>
                        <Box fontWeight={"600"} color={"blue.600"}>
                          $299,43
                        </Box>
                        <Box fontWeight={"300"}> Quantity : 2 </Box>
                      </VStack>
                      <HStack
                        h={"full"}
                        // w={"30%"}
                        justifyContent={"center"}
                        alignItems="center"
                      >
                        <Flex justifyContent="center" alignItems={"center"}>
                          <Quantity />
                        </Flex>

                        <IconButton
                          aria-label="hello"
                          icon={<FiDelete fontSize={"1.4rem"} color="red" />}
                        />
                      </HStack>
                    </HStack>
                  </Flex>
                </Box>
              );
            })}
          </Flex>
          <Box
            borderRadius="5px"
            border={"1px solid #000"}
            padding="2rem"
            w={["calc(100% - 1rem)", "full", "100%", "25%"]}
          >
            <Box marginX={["1rem", "2rem", "2rem", 0]}>
              <HStack fontWeight={"600"} justifyContent={"space-between"}>
                <Text>Subtotal</Text>
                <Text>Rs.200</Text>
              </HStack>
              <HStack fontWeight={"600"} justifyContent={"space-between"}>
                <Text>Shipping fee</Text>
                <Text>Rs.40</Text>
              </HStack>
              <HStack fontWeight={"600"} justifyContent={"space-between"}>
                <Text>Coupon</Text>
                <Text>0</Text>
              </HStack>
              <Button mt={"2rem"} bg={"blue.100"} w={"full"}>
                Place Order
              </Button>
            </Box>
          </Box>
          {/* {Array.from(Array(6)).map((e, i) => (
            <Box key={i}>e</Box>
          ))} */}
        </Flex>
      </Box>
    </Box>
  );
};

export default Cart;
