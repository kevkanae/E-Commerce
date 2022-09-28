import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

export const MotionBox = chakra(motion.div, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});

export const MotionImg = chakra(motion.img, {
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
});
