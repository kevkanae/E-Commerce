export const GetAllProductsQuery = `
  query{
    getAllProducts {
      data {
        name
        image_url
        price
      } 
      error
      message
    }
  }
`;
