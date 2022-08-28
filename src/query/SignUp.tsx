export const SignUpQuery = `mutation Login($name: String!, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      data {
        token
        email
        name
        username
      }
      message
      error
    }
  }`;
