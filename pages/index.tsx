import Layout from "../layout/Layout";
import type { NextPage } from "next";
import Products from "../components/Products";
import { Box } from "@chakra-ui/react";
import { Carousel } from "../components/carousel";

const Home: NextPage = () => {
  return (
    <Layout>
      {/* <Carousel /> */}
      <Products />
    </Layout>
  );
};

export default Home;
