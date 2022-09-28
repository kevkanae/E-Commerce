import { useNavigate } from "react-router-dom";
import Img from "../../assets/auth/landing.png";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  chakra,
  Flex,
  Image,
  shouldForwardProp,
  Text,
} from "@chakra-ui/react";
import { isValidMotionProp, motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();

  const ChakraBox = chakra(motion.div, {
    shouldForwardProp: (prop) =>
      isValidMotionProp(prop) || shouldForwardProp(prop),
  });

  return (
    <>
      <Flex
        w="full"
        h="100vh"
        bg="bg.main"
        position="relative"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          w={{
            sm: "100%",
            md: "40%",
          }}
          color="text.main"
          pl="10"
        >
          <Text
            fontSize={{
              sm: "2rem",
              md: "1.4rem",
              lg: "2rem",
            }}
            fontWeight={900}
            color="text.light"
          >
            Get All Your Dressing Needs At One Stop
          </Text>
          <Box
            pt={{
              md: 3,
              lg: 5,
            }}
          >
            <Text
              fontSize={{
                sm: "4rem",
                md: "3rem",
                lg: "6rem",
              }}
              fontWeight={900}
            >
              SHOP
            </Text>
            <Text
              display="inline-block"
              lineHeight={{
                sm: "4rem",
                md: "3rem",
                lg: "6rem",
              }}
              bg="teal.main"
              fontSize={{
                sm: "4rem",
                md: "3rem",
                lg: "6rem",
              }}
              color="bg.secondary"
              fontWeight="900"
            >
              NOW
            </Text>
          </Box>
          <Button
            rightIcon={<ArrowForwardIcon />}
            colorScheme="teal"
            variant="outline"
            mt={{
              sm: 3,
              md: 2,
            }}
            onClick={() => navigate("/home")}
          >
            Take Me There
          </Button>
        </Box>
        <ChakraBox
          display={{
            sm: "none",
            md: "flex",
          }}
          justifyContent="flex-end"
          alignSelf="flex-end"
          w="60%"
          animate={{ y: [-7, 7] }}
          // @ts-ignore
          transition={{
            duration: 3,
            type: "ease-in-out",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <Image w="90%" src={Img} />
        </ChakraBox>
      </Flex>
    </>
  );
};

export default HeroSection;
