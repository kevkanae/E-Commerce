import { verify } from "jsonwebtoken";
import { IContext } from "../interface/context";

export const AuthMiddleware = (ctx: IContext) => {
  const auth = ctx.req.headers["authorization"];

  if (!auth) {
    return {
      message: "Unauthorized",
      error: true,
    };
  }

  try {
    const token = auth.split(" ")[1];

    verify(token, process.env.ACCESS_KEY!, (err, decoded) => {
      if (err) console.log(err);
      else ctx.payload = decoded;
    });

    return null;
  } catch (error) {
    return {
      message: 'Couldn"t Verify Token',
      error: true,
    };
  }
};
