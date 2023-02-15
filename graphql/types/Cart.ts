import { list, objectType } from "nexus";

export const CartResponse = objectType({
  name: "CartResponse",
  definition(t) {
    t.nonNull.string("message");
    t.nonNull.boolean("error");
  },
});

export const CartProductData = objectType({
  name: "CartProductData",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("image_url");
    t.int("price");
    t.int("quantity");
    t.float("rating");
    t.string("category");
    t.string("brand");
  },
});

export const GetCartResponse = objectType({
  name: "GetCartResponse",
  definition(t) {
    t.nonNull.string("message");
    t.nonNull.boolean("error");
    t.field("data", { type: list(CartProductData) });
  },
});
