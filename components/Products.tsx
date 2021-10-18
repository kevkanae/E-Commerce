import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Tooltip,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { ProductList } from "../utils/Products";
import Rating from "./Rating";

const ProductAddToCart = () => {
  return (
    <SimpleGrid columns={3} spacing={7} h="80vh" w="100%" overflowY="scroll">
      {ProductList.map((x: any, i: number) => (
        <Flex key={i} p={7} align="center" justify="center">
          <Box bg="white" color="blackk" maxW="sm" rounded="md" shadow="md">
            <Image src={x.image} alt={`Picture of ${x.name}`} roundedTop="md" />
            <Box p={7}>
              <Flex mt={1} justify="space-between" align="center">
                <Text
                  fontSize="xl"
                  fontWeight={700}
                  lineHeight="tight"
                  isTruncated
                >
                  {x.name}
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
                <Rating rating={x.rating} numReviews={x.numReviews} />
                <Text as="span" color={"gray.600"} fontSize="2xl">
                  ₹{x.price.toFixed(2)}
                </Text>
              </Flex>
            </Box>
          </Box>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default ProductAddToCart;
