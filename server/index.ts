import "dotenv/config";
import express from "express";
import { apolloServer } from "./server";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

async function main() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("Welcome to XKart API");
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://127.0.0.1:5173"],
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
