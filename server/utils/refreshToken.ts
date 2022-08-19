import jwt from "jsonwebtoken";

export const refreshToken = (email: string) =>
  jwt.sign({ email }, process.env.REFRESH_TOKEN!, {
    expiresIn: "7d",
  });
