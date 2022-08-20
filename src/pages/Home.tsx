import React from "react";
import Landing from "../components/Home/Landing";
import Navbar from "../layout/Navbar/Navbar";

const ImageGrid = React.lazy(() => import("../components/Home/ImageGrid"));
const Footer = React.lazy(() => import("../components/Home/Footer"));

const Home = () => {
  return (
    <>
      <Navbar />
      <Landing />
      <ImageGrid />
      <Footer />
    </>
  );
};

export default Home;
