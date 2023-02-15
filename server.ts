import { ApolloServer } from "apollo-server-express";
import { IContext } from "./interface/context";
import { schema } from "./schema";

export const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }: IContext) => ({ req, res }),
});
