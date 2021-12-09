export interface User {
  username: String;
  name: String;
  email: String;
  password: String;
}

export interface loginResp {
  status: string;
  token: string;
}
