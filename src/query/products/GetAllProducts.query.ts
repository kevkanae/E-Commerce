export const GetAllProductsQuery = `
  query($search: String!){
    getAllProducts(search: $search) {
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
