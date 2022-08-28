export const Loginquery = ` mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      data {
        token
        email
        name
        username
      }
      error
    }
  }  
`;
