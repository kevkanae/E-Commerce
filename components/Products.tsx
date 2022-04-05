import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Tooltip,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import Rating from "./Rating";
import { useGetProductsQuery } from "../redux/API/GetProducts";
import { IProduct } from "../interfaces/Product";
import { Carousel } from "./Carousel/Carousel";

const ProductAddToCart = () => {
  const { isError, isFetching, data } = useGetProductsQuery({});

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isFetching) {
    return (
      <Flex
        w={"full"}
        h={"70vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner size={"xl"} />
      </Flex>
    );
  } else
    return (
      <Box>
        <Carousel />
        <SimpleGrid
          columns={[1, 2, 2, 3, 4]}
          p={7}
          spacing={7}
          // h="80vh"
          w="100vw"
          // overflowY="scroll"
          overflowX="hidden"
        >
          {isError ? (
            <Flex
              w="100vw"
              direction={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <p>Check your Internet connection</p>
              <Button bg={"alpha"}>Refresh</Button>
            </Flex>
          ) : (
            data?.map((x: IProduct, i: number) => (
              <Flex key={i} align="center" justify="center">
                <Box
                  bg="white"
                  color="blackk"
                  maxW="sm"
                  rounded="md"
                  shadow="md"
                >
                  <Link href={`item/${x.ID}`} passHref>
                    <Image
                      _hover={{
                        cursor: "pointer",
                        shadow: "md",
                      }}
                      src={x.Image}
                      alt={`Picture of ${x.Name}`}
                      roundedTop="md"
                    />
                  </Link>
                  <Box p={7}>
                    <Flex mt={1} justify="space-between" align="center">
                      <Text
                        fontSize="xl"
                        fontWeight={700}
                        lineHeight="tight"
                        width="40%"
                        isTruncated
                      >
                        {x.Name}
                      </Text>
                      <Tooltip
                        hasArrow
                        label="Add to Cart"
                        bgColor="whitee"
                        color="blackk"
                        fontSize="md"
                        p={2}
                      >
                        <Button variant="tertiary">
                          <span>
                            <FiShoppingCart />
                          </span>
                        </Button>
                      </Tooltip>
                    </Flex>

                    <Flex mt={3} justify="space-between" align="center">
                      <Rating
                        rating={x.Rating}
                        numReviews={x.NumReviews}
                        flag={true}
                      />
                      <Text as="span" color={"gray.600"} fontSize="2xl">
                        ₹{x.Price.toFixed(2)}
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            ))
          )}
        </SimpleGrid>
      </Box>
    );
};

export default ProductAddToCart;
