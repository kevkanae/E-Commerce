import jwt from "jsonwebtoken";

export const signToken = (email: string) =>
  jwt.sign({ email }, "MYSECRET", {
    expiresIn: "2h",
  });
