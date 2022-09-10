import React from "react";
import Navbar from "../layout/Navbar/Navbar";
import Landing from "../components/Home/Landing";

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
