import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Link as ATag,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProductList } from "../../utils/Products";
import Rating from "../../components/Rating";
import Reviews from "../../components/Reviews";

const ItemPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const currentItem = ProductList.find((x) => x.slug === slug);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex h="100vh" w="100vw" align="center" direction="column">
      <Flex h="12vh" w="full" align="center" justify="space-between" px={4}>
        <Text fontFamily="Pacifico" fontSize="2xl" textAlign="start">
          Use • Kart
        </Text>
        <Link href="/" passHref>
          <Button variant="primary">Go Back</Button>
        </Link>
      </Flex>
      <Flex h="84vh" w="full" p={3} align="center" justify="space-between">
        <Box h="full" w="35vw">
          <Image
            borderRadius="md"
            src={currentItem?.image}
            alt={currentItem?.name}
          />
        </Box>
        <Flex direction="column" h="full" w="32vw" textAlign="center">
          <Text fontWeight={600} fontSize="xl">
            {currentItem?.name}
          </Text>
          <Text fontWeight={400} fontSize="lg" mt={3}>
            Brand: {currentItem?.brand}
          </Text>
          <Text fontWeight={400} fontSize="lg" mt={3}>
            Category: {currentItem?.category}
          </Text>
          <Text fontWeight={400} fontSize="lg" mt={3}>
            Description: {currentItem?.description}
          </Text>
          <Flex mt={3} justify="center" align="center">
            <ATag onClick={onOpen}>
              <Rating
                rating={currentItem?.rating}
                numReviews={currentItem?.numReviews}
                flag={false}
              />
            </ATag>
          </Flex>
        </Flex>
        <Flex
          direction="column"
          w="28vw"
          alignSelf="flex-start"
          shadow="md"
          borderRadius={7}
          p={3}
          bgColor="white"
        >
          <Flex
            align="center"
            justify="space-between"
            fontWeight={400}
            fontSize="lg"
          >
            <Text>Price</Text>
            <Text>₹ {currentItem?.price}</Text>
          </Flex>
          <Flex
            align="center"
            justify="space-between"
            fontWeight={400}
            fontSize="lg"
            mt={3}
          >
            <Text>Stock</Text>
            <Text>{currentItem?.countInStock}</Text>
          </Flex>
          <Button mt={3} variant="secondary">
            Add to Cart
          </Button>
        </Flex>
      </Flex>
      <Reviews isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default ItemPage;
