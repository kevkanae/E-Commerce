export const GetSomeProductsQuery = `
  query{
    getSomeProducts {
      data {
        name
        image_url
      } 
      error
      message
    }
  }
`;
