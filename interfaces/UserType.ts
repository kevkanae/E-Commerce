export interface User {
  username: string;
  name: string;
  email: string;
  password: string;
}

export interface loginResp {
  status: string;
  token: string;
}
