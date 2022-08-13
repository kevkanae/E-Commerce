import React from "react";
import Landing from "../components/Home/Landing";

const HoverGrid = React.lazy(() => import("../components/Home/HoverGrid"));
const Footer = React.lazy(() => import("../components/Home/Footer"));

const Home = () => {
  return (
    <>
      <Landing />
      <HoverGrid />
      <Footer />
    </>
  );
};

export default Home;
