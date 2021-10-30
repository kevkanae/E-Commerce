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
import Link from "next/link";
import { ProductList } from "../utils/Products";
import Rating from "./Rating";

const ProductAddToCart = () => {
  return (
    <SimpleGrid
      columns={[1, 2, 2, 3, 4]}
      p={7}
      spacing={7}
      h="80vh"
      w="100vw"
      overflowY="scroll"
      overflowX="hidden"
    >
      {ProductList.map((x: any, i: number) => (
        <Flex key={i} align="center" justify="center">
          <Box bg="white" color="blackk" maxW="sm" rounded="md" shadow="md">
            <Link href={`item/${x.slug}`} passHref>
              <Image
                _hover={{
                  cursor: "pointer",
                  shadow: "md",
                }}
                src={x.image}
                alt={`Picture of ${x.name}`}
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
                <Rating
                  rating={x.rating}
                  numReviews={x.numReviews}
                  flag={true}
                />
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
