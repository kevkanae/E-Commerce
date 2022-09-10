import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { prisma } from "../index";
import { accessToken } from "./accessToken";
import { refreshToken } from "./refreshToken";

export const refreshRoute = async (req: Request, res: Response) => {
  const cookie = req.cookies.yum;
  console.log(req.headers);

  if (!cookie) {
    return res.send({
      error: true,
      message: "No Cookie Found",
      token: "",
    });
  }

  let payload: any;
  try {
    payload = verify(cookie, process.env.REFRESH_KEY!);
  } catch (err) {
    console.log(err);
    return res.send({
      error: true,
      message: "Cookie Malformed",
      token: "",
    });
  }

  const user = await prisma.user.findMany({
    where: {
      email: payload.email,
    },
  });

  if (!user) {
    return res.send({
      error: true,
      message: "User Not Found",
      token: "",
    });
  } else {
    res.cookie("yum", refreshToken(payload.email), { httpOnly: true });
    return res.send({
      error: false,
      message: "Refresh Successful",
      token: accessToken(payload.email),
    });
  }
};
