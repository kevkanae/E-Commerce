import jwt from "jsonwebtoken";

export const accessToken = (email: string) =>
  jwt.sign({ email }, process.env.ACCESS_KEY!, {
    expiresIn: "2h",
  });
