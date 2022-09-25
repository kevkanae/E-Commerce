import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Input, Button, chakra } from "@chakra-ui/react";

interface IForms<T> {
  isSignup: boolean;
  form: T;
  setForm: any;
  authHandler: any;
  fetching: boolean;
}
interface IFormData {
  name?: string;
  email: string;
  password: string;
}
const Forms = <T,>({
  isSignup,
  setForm,
  authHandler,
  fetching,
}: IForms<T>): JSX.Element => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((data: IFormData) => {
      return {
        ...data,
        [e.target.name]: e.target.value,
      };
    });
  };

  return (
    <>
      <chakra.form>
        {isSignup && (
          <>
            <chakra.label color="text.main" htmlFor="name" fontWeight={600}>
              Name
            </chakra.label>
            <Input
              name="name"
              color="text.light"
              type="text"
              placeholder="Enter Name"
              mb={4}
              borderWidth="1px"
              onChange={onChange}
            />
          </>
        )}

        <chakra.label color="text.main" htmlFor="email" fontWeight={600}>
          Email
        </chakra.label>
        <Input
          name="email"
          color="text.light"
          type="email"
          placeholder="Enter Email"
          mb={4}
          borderWidth="1px"
          onChange={onChange}
        />

        <chakra.label color="text.main" htmlFor="password" fontWeight={600}>
          Password
        </chakra.label>
        <Input
          name="password"
          color="text.light"
          type="password"
          placeholder="Enter Password"
          mb={4}
          borderWidth="1px"
          onChange={onChange}
        />
        <Button
          rightIcon={<ArrowForwardIcon />}
          variant="AuthButton"
          onClick={authHandler}
          isLoading={fetching}
          textTransform="uppercase"
          letterSpacing={2}
        >
          {isSignup ? "SIGN UP" : "LOGIN"}
        </Button>
      </chakra.form>
    </>
  );
};

export default Forms;
