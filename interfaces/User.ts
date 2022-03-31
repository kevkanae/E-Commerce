export interface IUser {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  status: string;
  token: string;
}
