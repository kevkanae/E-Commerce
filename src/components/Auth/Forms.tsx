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
            <chakra.label color={"text"} htmlFor="name" fontWeight={600}>
              Name
            </chakra.label>
            <Input
              borderWidth={"2px"}
              color={"heading"}
              mb={4}
              name="name"
              type="text"
              onChange={onChange}
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
          onChange={onChange}
        />

        <chakra.label color={"text"} htmlFor="password" fontWeight={600}>
          Password
        </chakra.label>
        <Input
          borderWidth={"2px"}
          color={"heading"}
          mb={4}
          name="password"
          type="password"
          onChange={onChange}
        />
        <Button
          rightIcon={<ArrowForwardIcon />}
          bg={"button"}
          textColor={"buttonText"}
          onClick={authHandler}
          isLoading={fetching}
        >
          {isSignup ? "Signup" : "Login"}
        </Button>
      </chakra.form>
    </>
  );
};

export default Forms;
