import React from "react";
import HeroSection from "../components/Landing/HeroSection";

const ImageGrid = React.lazy(() => import("../components/Landing/ImageGrid"));
const Footer = React.lazy(() => import("../components/Landing/Footer"));

const Landing = () => {
  return (
    <>
      <HeroSection />
      <ImageGrid />
      <Footer />
    </>
  );
};

export default Landing;
