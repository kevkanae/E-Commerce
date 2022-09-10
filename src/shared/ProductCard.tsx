import { Flex, chakra, Box, Image } from "@chakra-ui/react";

const ProductCard = ({
  image,
  title,
  price,
}: {
  image: string;
  title: string;
  price: number;
}) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="sm"
      mx="auto"
      _hover={{
        cursor: "pointer",
        filter: `drop-shadow(0 0.1rem 0.4rem #153126)`,
      }}
    >
      <Box
        bg="gray.300"
        h={64}
        w="full"
        rounded="lg"
        shadow="md"
        bgSize="cover"
        bgPos="center"
        style={{
          backgroundImage: `url(${image})`,
        }}
      />

      <Box
        w={{
          base: 56,
          md: 64,
        }}
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
          color="gray.800"
          _dark={{
            color: "white",
          }}
          letterSpacing={1}
        >
          {title}
        </chakra.h3>

        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={2}
          px={3}
          bg="gray.200"
          _dark={{
            bg: "gray.700",
          }}
        >
          <chakra.span
            fontWeight="bold"
            color="gray.800"
            _dark={{
              color: "gray.200",
            }}
          >
            ₹{price}
          </chakra.span>
          <chakra.button
            bg="button"
            fontSize="xs"
            fontWeight="bold"
            color="white"
            px={2}
            py={1}
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: "gray.700",
              _dark: {
                bg: "gray.600",
              },
            }}
            _focus={{
              bg: "gray.700",
              _dark: {
                bg: "gray.600",
              },
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
