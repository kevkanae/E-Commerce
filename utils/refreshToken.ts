import jwt from "jsonwebtoken";

export const refreshToken = (email: string) =>
  jwt.sign({ email }, process.env.REFRESH_KEY!, {
    expiresIn: "7d",
  });
