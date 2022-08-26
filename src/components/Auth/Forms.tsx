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
            <chakra.label htmlFor="name" fontWeight={600}>
              Name
            </chakra.label>
            <Input mb={4} name="name" type="text" />
          </>
        )}

        <chakra.label htmlFor="email" fontWeight={600}>
          Email
        </chakra.label>
        <Input mb={4} name="email" type="email" />

        <chakra.label htmlFor="password" fontWeight={600}>
          Password
        </chakra.label>
        <Input mb={4} name="password" type="text" />
        <Button></Button>
      </chakra.form>
    </>
  );
};

export default Forms;
