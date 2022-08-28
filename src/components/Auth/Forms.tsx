import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Input, Button, chakra } from "@chakra-ui/react";

interface IForms {
  isSignup: boolean;
}

const Forms = ({ isSignup }: IForms) => {
  return (
    <>
      <chakra.form>
        {isSignup && (
          <>
            <chakra.label color={"text"} htmlFor="name" fontWeight={600}>
              Name
            </chakra.label>
            <Input
              borderWidth={"2px"}
              color={"heading"}
              mb={4}
              name="name"
              type="text"
            />
          </>
        )}

        <chakra.label color={"text"} htmlFor="email" fontWeight={600}>
          Email
        </chakra.label>
        <Input
          borderWidth={"2px"}
          color={"heading"}
          mb={4}
          name="email"
          type="email"
        />

        <chakra.label color={"text"} htmlFor="password" fontWeight={600}>
          Password
        </chakra.label>
        <Input
          borderWidth={"2px"}
          color={"heading"}
          mb={4}
          name="password"
          type="text"
        />
        <Button
          rightIcon={<ArrowForwardIcon />}
          bg={"tertiary"}
          textColor={"buttonText"}
        >
          {isSignup ? "Signup" : "Login"}
        </Button>
      </chakra.form>
    </>
  );
};

export default Forms;
