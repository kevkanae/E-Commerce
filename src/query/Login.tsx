import { useQuery } from "urql";

export const SignInQuery = `mutation Login($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      data {
        token
      }
      message
      error
    }
  }`;
