import { Button, Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "./Navbar";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Use|Kart</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <>{children}</>
    </>
  );
};

export default Layout;
