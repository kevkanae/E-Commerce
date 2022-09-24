import "dotenv/config";
import cors from "cors";
import express from "express";
import { apolloServer } from "./server";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import { refreshRoute } from "./utils/refreshRoute";
import { defaultRoute } from "./utils/defaultRoute";

export const prisma = new PrismaClient();
const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: [
    "https://studio.apollographql.com",
    "https://xkart.vercel.app/",
    "http://127.0.0.1:5173",
    "http://localhost:5173",
  ],
};

async function main() {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(cors(corsOptions));

  app.get("/", defaultRoute);
  app.post("/refresh", refreshRoute);

  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: corsOptions,
  });

  app.listen(process.env.PORT! || 8080, () => {
    console.log("Server Connected (❁´◡`❁)");
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
