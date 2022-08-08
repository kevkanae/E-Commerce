import Head from "next/head";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface BaseLayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <>
      <Head>
        <title>XKart | ECommerce App</title>
        <meta name="description" content="E-Commerce App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <>{children}</>
      <Footer />
    </>
  );
};

export default Layout;
