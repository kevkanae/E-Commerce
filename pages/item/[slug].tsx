import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Reviews from "../../components/Reviews";
import { useEffect, useState } from "react";
import { BiCartAlt } from "react-icons/bi";
import { CarouselBody } from "../../components/Carousel/CarouselBody";
import { CarouselItem } from "../../components/Carousel/CarouselItem";
import { useGetProductsQuery } from "../../redux/API/GetProducts";
import { IProduct } from "../../interfaces/Product";
import { useAddToCartMutation } from "../../redux/API/AddToCart";

const ItemPage = () => {
  const router = useRouter();
  const [id, setID] = useState("");
  const [quantity, setquantity] = useState<number>(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { slug } = router.query;

  //API Fetch and Post
  const { isError, isFetching, data } = useGetProductsQuery({});
  const [addToCart, { isLoading }] = useAddToCartMutation();
  //Get the ProductID from router parameter
  useEffect(() => {
    if (!isError && !isFetching) {
      data?.filter((x: IProduct) => {
        if (x.Slug === slug) {
          setID(x.ID);
        }
      });
    }
  }, []);

  const onIncQuantity = () => {
    if (quantity >= 10) return;
    setquantity((q) => q + 1);
  };
  const onDecQuantity = () => {
    if (quantity <= 1) return;
    setquantity((q) => q - 1);
  };
  const handleCartAdd = async () => {
    let postData = {
      productId: id,
      quantity: quantity,
      timeStamp: Date.now(),
    };
    //Reducer
    await addToCart(postData);
  };

  return (
    <Flex h="100vh" w="100vw" align="center" direction="column">
      {/* Nav */}
      <Flex h="12vh" w="full" align="center" justify="space-between" px={4}>
        <Text fontFamily="Pacifico" fontSize="2xl" textAlign="start">
          Use • Kart
        </Text>
        <Link href="/" passHref>
          <Button variant="primary">Go Back</Button>
        </Link>
      </Flex>
      {/* Body */}
      <Flex w="full">
        <Box width={"30%"} padding={"20px"}>
          <CarouselBody>
            <CarouselItem height={400} width={10}>
              <Box height={"100%"} width={"100%"} position={"relative"}>
                <Image
                  height={"100%"}
                  width={"100%"}
                  objectFit={"fill"}
                  alt="shopping"
                  src="/hero.png"
                />
                <Box
                  position={"absolute"}
                  top={"10px"}
                  width={"100%"}
                  height={"100%"}
                >
                  <Button>jije</Button>
                </Box>
              </Box>
            </CarouselItem>
            <CarouselItem height={400} width={10}>
              {/* {" "} */}
              <Image
                height={"100%"}
                width={"100%"}
                objectFit={"fill"}
                alt="shopping"
                src="/hero.png"
              />
            </CarouselItem>
            <CarouselItem height={400} width={10}>
              <Image
                height={"100%"}
                width={"100%"}
                objectFit={"fill"}
                alt="shopping"
                src="/hero.png"
              />
            </CarouselItem>
          </CarouselBody>
        </Box>
        <Box width={"70%"} padding={"20px"}>
          <Text fontSize={"1.4rem"} fontWeight={"600"}>
            Sona Armless Chair
          </Text>
          <Text mt="1rem">$400.00</Text>
          <Text>Available : In Stock</Text>
          <Text
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
            }}
            mt={"1rem"}
            fontSize={".9rem"}
            fontWeight={"500"}
          >
            Versatile elegance for dining room, office or living room. This
            seating solution offers great appeal. Bamboo chairs combine premium
            quality materials with unique high-style design, with the advanced
            product engineering and packaging reinforcement, each product is
            designed, manufactured and packaged with shipping in mind.
          </Text>
          <Box mt={"1rem"}>
            <Text fontSize={".8rem"}>Quantity</Text>
            <HStack mt="1rem">
              <Box
                borderRadius={"3px"}
                border={"2px solid #231a02"}
                p={"2px 8px"}
                cursor={"pointer"}
                onClick={onDecQuantity}
              >
                -
              </Box>
              <Text>{quantity}</Text>
              <Box
                cursor={"pointer"}
                borderRadius={"3px"}
                border={"2px solid #231a02"}
                p={"2px 8px"}
                onClick={onIncQuantity}
              >
                +
              </Box>
            </HStack>
            <Button
              mt="1rem"
              variant={"secondary"}
              leftIcon={<BiCartAlt />}
              onClick={handleCartAdd}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Flex>
      {/* <Flex
        h="84vh"
        w="full"
        direction={["column", "row"]}
        overflowY={["scroll", "hidden"]}
        p={3}
        align="center"
        justify="space-between"
      >
        <Box h={["77vh", "full"]} w={["90vw", "35vw"]} p={3}>
          <Image
            borderRadius="md"
            src={currentItem?.image}
            alt={currentItem?.name}
          />
        </Box>
        <Flex
          direction="column"
          h={["77vh", "full"]}
          w={["90vw", "32vw"]}
          p={3}
          textAlign="center"
        >
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
          w={["90vw", "28vw"]}
          alignSelf="flex-start"
          shadow="md"
          borderRadius={7}
          mt={[2, 0]}
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
      </Flex> */}
      <Reviews isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

export default ItemPage;
