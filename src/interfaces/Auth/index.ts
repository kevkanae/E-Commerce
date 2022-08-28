// Signup
export interface ISignUp {
    signup: Signup;
}

export interface Signup {
    data:       Data;
    message:    string;
    error:      boolean;
    __typename: string;
}

export interface Data {
    token:      string;
    email:      string;
    name:       string;
    username:   string;
    __typename: string;
}


// Login

export interface ILogin {
    login: Login;
}

export interface Login {
    message:    string;
    data:       Data;
    error:      boolean;
    __typename: string;
}

export interface Data {
    token:      string;
    email:      string;
    name:       string;
    username:   string;
    __typename: string;
}

