import {
  Flex,
  Box,
  Image,
  Text,
  Button,
  Link as ATag,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ReviewModalProps } from "../interfaces/ReviewModal";

const Reviews = ({ isOpen, onClose }: ReviewModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontWeight={600} fontSize="lg">
            Reviews
          </Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            h="50vh"
            w="full"
            p={3}
            align="center"
            justify="space-between"
          ></Flex>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Add Review</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Reviews;
