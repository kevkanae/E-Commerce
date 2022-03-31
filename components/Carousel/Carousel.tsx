import { Box, Button, Image } from "@chakra-ui/react";
import React from "react";
import { CarouselBody } from "./CarouselBody";
import { CarouselItem } from "./CarouselItem";

export const Carousel = () => {
  return (
    <Box width={"100vw"} overflow={"hidden"}>
      <CarouselBody>
        <CarouselItem height={200} width={10}>
          <Box position={"relative"}>
            <Image alt="shopping" objectFit={"fill"} src="/hero.png" />
            <Box
              position={"absolute"}
              top={"10px"}
              width={"100%"}
              height={"100%"}
            >
              <Button>jije</Button>
            </Box>
          </Box>
        </CarouselItem>
        <CarouselItem height={200} width={10}>
          {" "}
          <Image alt="shopping" src="/hero.png" />
        </CarouselItem>
        <CarouselItem height={200} width={10}>
          <Image alt="shopping" src="/hero.png" />
        </CarouselItem>
      </CarouselBody>
    </Box>
  );
};
