import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";
import cookieParser from "cookie-parser";

export const prisma = new PrismaClient();

async function main() {
  const app = express();

  //Remove from prod
  app.set("trust proxy", true);

  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (_, res) => {
    res.send("Welcome to XKart API");
  });

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res }),
    introspection: true, //remove during prod
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    },
  });

  app.listen(8080, () => {
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
