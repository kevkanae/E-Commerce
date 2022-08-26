import "dotenv/config";
import express from "express";
import { apolloServer } from "./server";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { accessToken } from "./utils/accessToken";
import { refreshToken } from "./utils/refreshToken";

export const prisma = new PrismaClient();

async function main() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("Welcome to XKart API");
  });

  app.post("/refresh", async (req, res) => {
    const cookie = req.cookies.yum;

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
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [
        "https://studio.apollographql.com",
        "http://127.0.0.1:5173",
        "http://localhost:5173",
      ],
    },
  });

  app.listen(process.env.PORT! || 8080, () => {
    console.log("Server Connected :)");
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
