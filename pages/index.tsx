import Layout from "../layout/Layout";
import type { NextPage } from "next";
import Products from "../components/Products";

const Home: NextPage = () => {
  return (
    <Layout>
      <Products />
    </Layout>
  );
};

export default Home;
