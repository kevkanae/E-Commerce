export interface IGetSomeProductsData {
  name: string;
  image_url: string;
}

export interface IGetSomeProducts {
  data: IGetSomeProductsData[];
  error: boolean;
  message: string;
}

export interface IGetSomeProductsQuery {
  getSomeProducts: IGetSomeProducts;
}
