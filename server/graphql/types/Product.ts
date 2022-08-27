import { list, nonNull, nullable, objectType } from "nexus";

export const ProductData = objectType({
  name: "ProductData",
  definition(t) {
    t.int("id");
    t.string("name");
    t.string("image_url");
    t.int("price");
    t.float("rating");
    t.string("category");
  },
});

export const ProductsResponse = objectType({
  name: "ProductsResponse",
  definition(t) {
    t.nonNull.string("message");
    t.field("data", { type: list(ProductData) });
    t.nonNull.boolean("error");
  },
});
