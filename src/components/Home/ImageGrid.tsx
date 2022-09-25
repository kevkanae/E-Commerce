import {
  Box,
  Button,
  chakra,
  Flex,
  Grid,
  Image,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { useQuery } from "urql";
import Loader from "../../layout/Loader";
import { BsChevronCompactDown } from "react-icons/bs";
import { IGetAllProductsQuery } from "../../interfaces/Product/IGetAllProducts";
import { GetAllProductsQuery } from "../../query/products/GetAllProducts.query";
import { useNavigate } from "react-router-dom";

const ImageGrid = () => {
  const navigate = useNavigate();

  const [{ data, error, fetching }, handleQuery] =
    useQuery<IGetAllProductsQuery>({
      query: GetAllProductsQuery,
    });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const style: TextProps = {
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
        <Box pt="36" bg={"bg.primary"}>
          <Text
            fontSize={"5rem"}
            fontWeight="900"
            textAlign={"center"}
            color={"white"}
            pb="10"
          >
            Find your{" "}
            <chakra.span {...style} display={"inline-block"}>
              style
            </chakra.span>
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
            bg={"bg.primary"}
          >
            {data.getAllProducts.data.map(
              (x, i) =>
                i <= 5 && (
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
                )
            )}
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
            >
              <Button
                bg={"button"}
                color="buttonText"
                onClick={() => navigate("/home")}
              >
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
