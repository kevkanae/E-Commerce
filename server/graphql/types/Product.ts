import { list, nonNull, objectType } from "nexus";

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

export const ProductResponse = objectType({
  name: "ProductResponse",
  definition(t) {
    t.nonNull.string("message");
    t.field("data", { type: nonNull(list(ProductData)) });
    t.nonNull.boolean("error");
  },
});
