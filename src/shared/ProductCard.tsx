import { Flex, chakra, Box, Image } from "@chakra-ui/react";
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";

interface IProductCardProps {
  image: string;
  title: string;
  price: number;
  id: number;
}

const ProductCard = ({ image, title, price, id }: IProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w={["77vw", "42vw", "25vw"]}
      h="45vh"
      _hover={{
        cursor: "pointer",
        filter: `drop-shadow(0 0.1rem 0.6rem #153126)`,
      }}
    >
      <Box
        bg="text.secondary"
        h="84%"
        w="full"
        rounded="lg"
        shadow="md"
        bgSize="cover"
        bgPos="center"
        onClick={() => navigate(`/home/${id}`)}
      >
        <Image
          src={image}
          alt={title}
          rounded="lg"
          objectFit="cover"
          // loading="lazy"
          h="100%"
          w="100%"
          fallback={<Loader />}
        />
      </Box>

      <Box
        w="77%"
        bg="white"
        _dark={{
          bg: "gray.800",
        }}
        mt={-10}
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <chakra.h3
          py={2}
          textAlign="center"
          fontWeight="bold"
          textTransform="uppercase"
          color="teal.dark"
          letterSpacing={1}
        >
          {title}
        </chakra.h3>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={2}
          px={3}
          bg="text.light"
        >
          <chakra.span fontWeight="bold" color="bg.primary">
            ₹{price}
          </chakra.span>

          <chakra.button
            bg="teal.main"
            fontSize="xs"
            fontWeight="bold"
            color="white"
            px={2}
            py={1}
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: "bg.secondary",
            }}
            _focus={{
              outline: "none",
            }}
          >
            Add to Cart
          </chakra.button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductCard;
