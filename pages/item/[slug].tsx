import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  useDisclosure,
  HStack,
  ToastMessage,
  useColorMode,
  Spinner,
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
import { useGetProductByIDQuery } from "../../redux/API/GetProductByID";
import { skipToken } from "@reduxjs/toolkit/query";

interface IProductByID {
  Product: IProduct;
}

const ItemPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [quantity, setquantity] = useState<number>(1);

  const {
    isFetching,
    isError,
    data,
  }: { isFetching: boolean; isError: boolean; data: IProductByID } | any =
    useGetProductByIDQuery(slug === undefined ? skipToken : slug);
  const [addToCart, mutation] = useAddToCartMutation();

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
      productId: slug as string,
      quantity: quantity,
      timeStamp: Date.now(),
    };
    //Reducer
    await addToCart(postData);
  };

  useEffect(() => {
    //TEMP CODE DELETE THIS
    if (mutation.isSuccess) alert("Added to cart");
  }, [mutation]);

  useEffect(() => {
    //TEMP CODE DELETE THIS
    console.log(data?.Product);
  }, [data]);

  if (!isFetching && !isError && data?.Product) {
    console.log(data.Product.Name);

    return (
      <Flex h="100vh" w="100vw" align="center" direction="column">
        {/* Nav */}
        <Flex
          h="10vh"
          w="100vw"
          px={4}
          py={1}
          align="center"
          justify="space-between"
          className="nav"
          backgroundColor={colorMode === "light" ? "white" : "blackk"}
        >
          <Text fontFamily="Pacifico" fontSize="2xl" textAlign="start">
            Use • Kart
          </Text>
          <Link href="/" passHref>
            <Button variant="primary">Back</Button>
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
              {data.Product.Name}
            </Text>

            <Text mt="1rem">${data.Product.Price}</Text>
            <Text>
              Available :
              {data.Product.CountInStock > 0 ? " In Stock" : " Out of Stock"}
            </Text>
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
              seating solution offers great appeal. Bamboo chairs combine
              premium quality materials with unique high-style design, with the
              advanced product engineering and packaging reinforcement, each
              product is designed, manufactured and packaged with shipping in
              mind.
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
        <Reviews isOpen={isOpen} onClose={onClose} />
      </Flex>
    );
  } else {
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
  }
};

export default ItemPage;
