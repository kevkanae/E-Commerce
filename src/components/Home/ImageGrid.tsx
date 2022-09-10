import {
  Box,
  BoxProps,
  Button,
  Flex,
  Grid,
  Image,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "urql";
import { IGetSomeProductsQuery } from "../../interfaces/Product/IGetSomeProducts";
import Loader from "../../layout/Loader";
import { BsChevronCompactDown } from "react-icons/bs";
import { GetSomeProductsQuery } from "../../query/products/GetSomeProducts.query";

const ImageGrid = () => {
  const [{ data, error, fetching }, handleQuery] =
    useQuery<IGetSomeProductsQuery>({
      query: GetSomeProductsQuery,
    });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const style: BoxProps = {
    position: "relative",
    _after: {
      content: `""`,
      position: "absolute",
      bottom: "0",
      left: 0,
      height: "10px",
      width: "100%",
      backgroundColor: "button",
      border: "solid 5px #000",
      borderColor: "#000 transparent transparent transparent",
      borderRadius: "50%/100px 100px 0 0",
    },
  };

  return (
    <>
      {data ? (
        <Box pt="36" bg={"background.sec"}>
          <Text
            fontSize={"5rem"}
            fontWeight="900"
            textAlign={"center"}
            color={"white"}
            pb="10"
          >
            Find your{" "}
            <Box {...style} display={"inline-block"}>
              {" "}
              style
            </Box>
          </Text>

          <Grid
            h="100vh"
            w="full"
            position="relative"
            templateColumns="repeat(3, 25vw)"
            columnGap={7}
            py={4}
            px={14}
            alignItems="center"
            justifyContent="center"
            bg={"background.sec"}
          >
            {data.getSomeProducts.data.map((x, i) => (
              <Flex
                key={i}
                direction="column"
                align="center"
                justify="center"
                h="42vh"
                w="25vw"
              >
                <Box
                  h="84%"
                  w="full"
                  _hover={{
                    cursor: "pointer",
                    filter: "drop-shadow(0 0 0.4rem #aaa)",
                  }}
                >
                  <Image
                    src={x.image_url}
                    fallbackSrc="https://via.placeholder.com/150"
                    alt={x.name}
                    borderRadius="md"
                    objectFit="cover"
                    h="full"
                    w="full"
                  />
                </Box>
                <Text fontWeight={600} mt={1}>
                  {x.name}
                </Text>
              </Flex>
            ))}
            <Flex
              w="full"
              h="21vh"
              direction="column"
              align="center"
              justify="center"
              position="absolute"
              bottom="6vh"
              left={0}
              bg="linear-gradient(178.6deg, rgba(20, 36, 50, 0.017) 11.8%,rgba(35, 37, 38, 0.785) 41.8%, #242629 83.8%)"

              // bg={`linear-gradient(to bottom,
              //   rgba(255,255,255,0),
              //   rgba(255,255,255,0.1),
              //   rgba(255,255,255,0.2),
              //   rgba(255,255,255,0.4),
              //   rgba(255,255,255,0.6),
              //   rgba(255,255,255,0.8),
              //   rgba(255,255,255,1))`}
            >
              <Button bg={"button"} color="buttonText">
                View More
              </Button>
              <Text>
                <BsChevronCompactDown size={28} />
              </Text>
            </Flex>
          </Grid>
        </Box>
      ) : (
        <Loader />
      )}
    </>
  );
};
export default ImageGrid;
