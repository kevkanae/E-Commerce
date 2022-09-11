import { SimpleGrid } from "@chakra-ui/react";
import { useQuery } from "urql";
import { IGetAllProductsQuery } from "../../interfaces/Product/IGetAllProducts";
import Loader from "../../layout/Loader";
import { GetAllProductsQuery } from "../../query/products/GetAllProducts.query";
import ProductCard from "../../shared/ProductCard";

const ProductGrid = () => {
  const [{ data, error, fetching }, handleQuery] =
    useQuery<IGetAllProductsQuery>({
      query: GetAllProductsQuery,
    });

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <SimpleGrid
      columns={[1, 2, 3]}
      placeItems="center"
      spacing="2rem"
      w="full"
      mt="7vh"
      p={4}
    >
      {!fetching && data ? (
        data.getAllProducts.data.map((x, i) => (
          <ProductCard
            image={x.image_url}
            title={x.name}
            price={x.price}
            key={i}
          />
        ))
      ) : (
        <Loader />
      )}
    </SimpleGrid>
  );
};

export default ProductGrid;
