export const GetAllProductsQuery = `
  query{
    getAllProducts {
      data {
        id
        name
        image_url
        price
      } 
      error
      message
    }
  }
`;
