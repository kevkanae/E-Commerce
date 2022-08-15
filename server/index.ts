import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";

export const prisma = new PrismaClient();

async function main() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (_, res) => {
    res.send("Welcome to XKart API");
  });

  const apolloServer = new ApolloServer({
    typeDefs: `
      type Query{
        data: String!
      }
    `,
    resolvers: {
      Query: {
        data: () => "hello world",
      },
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

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
