import { objectType } from "nexus";

export const CartResponse = objectType({
  name: "CartResponse",
  definition(t) {
    t.nonNull.string("message");
    t.nonNull.boolean("error");
  },
});
