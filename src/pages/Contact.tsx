import { useForm, SubmitHandler } from "react-hook-form";
import {
  Flex,
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { IContactInputTypes } from "../interfaces/Contact/IContactInputTypes";

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IContactInputTypes>();

  const onSubmit: SubmitHandler<IContactInputTypes> = (
    data: IContactInputTypes
  ) => console.log(data);

  return (
    <Flex w="full" h="full" align="center" justify="center">
      <Flex
        p={10}
        direction={"column"}
        align="center"
        bg="white"
        boxShadow={"lg"}
        borderRadius="md"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.title}>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              w="35vw"
              id="title"
              placeholder="Enter title"
              {...register("title", {
                required: "This is required",
                minLength: { value: 4, message: "Minimum length should be 4" },
              })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.description} mt={3}>
            <FormLabel htmlFor="title">Description</FormLabel>
            <Textarea
              w="35vw"
              id="description"
              placeholder="Enter Query"
              {...register("description", {
                required: "This is required",
                minLength: { value: 7, message: "Minimum length should be 7" },
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <Button mt={7} isLoading={isSubmitting} type="submit">
            Submit
          </Button>
        </form>
      </Flex>
    </Flex>
  );
};

export default Contact;
