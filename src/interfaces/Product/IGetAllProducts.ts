export interface IGetAllProductsData {
  id: number;
  name: string;
  image_url: string;
  brand: string;
  price: number;
}

export interface IGetAllProducts {
  data: IGetAllProductsData[];
  error: boolean;
  message: string;
}

export interface IGetAllProductsQuery {
  getAllProducts: IGetAllProducts;
}
