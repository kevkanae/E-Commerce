import { objectType } from "nexus";

const AuthData = objectType({
  name: "AuthData",
  definition(t) {
    t.string("token");
    t.string("email");
    t.string("name");
    t.string("username");
  },
});

export const AuthResponse = objectType({
  name: "AuthResponse",
  definition(t) {
    t.nonNull.string("message");
    t.field("data", { type: AuthData });
    t.nonNull.boolean("error");
  },
});
