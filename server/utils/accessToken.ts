import jwt from "jsonwebtoken";

export const accessToken = (email: string) =>
  jwt.sign({ email }, process.env.ACCESS_TOKEN!, {
    expiresIn: "2h",
  });
