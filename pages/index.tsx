import Layout from "../layout/Layout";
import type { NextPage } from "next";
import Products from "../components/Products";
import { Box } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Layout>
      <Products />
    </Layout>
  );
};

export default Home;
