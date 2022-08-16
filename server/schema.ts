import { makeSchema } from "nexus";
import { join } from "path";
import * as types from "./graphql/rootSchema";
import { Mutation } from "./graphql/resolvers/Mutations";
import { Query } from "./graphql/resolvers/Query";
import { User } from "./graphql/types/User";

export const schema = makeSchema({
  types,
  outputs: {
    typegen: join(__dirname, "..", "nexus-typegen.ts"),
    schema: join(__dirname, "..", "schema.graphql"),
  },
});
