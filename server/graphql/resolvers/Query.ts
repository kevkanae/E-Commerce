import { prisma } from "../../index";
import { IContext } from "../../interface/context";
import { ProductsResponse } from "../types/Product";
import { AuthMiddleware } from "../../utils/middlewareAuth";
import { intArg, list, nonNull, queryType, stringArg } from "nexus";

export const Query = queryType({
  definition(t) {
    t.field("getAllUsers", {
      type: nonNull(list("User")),
      resolve: (parent, args) => {
        return prisma.user.findMany();
      },
    });

    t.field("getSomeProducts", {
      type: ProductsResponse,
      resolve: async (parent, args) => {
        const data = await prisma.products.findMany({
          where: {
            id: { in: [1, 13, 11, 15, 2, 16] },
          },
        });

        return {
          message: "SUCCESS",
          error: false,
          data: [...data],
        };
      },
    });

    t.field("getAllProducts", {
      type: ProductsResponse,
      resolve: async (parent, args, ctx: IContext) => {
        const data = await prisma.products.findMany();

        return {
          message: "SUCCESS",
          error: false,
          data: data,
        };
      },
    });

    t.field("getOneProduct", {
      type: ProductsResponse,
      args: {
        productID: nonNull(intArg()),
      },
      resolve: async (parent, args, ctx: IContext) => {
        // const isAuth = AuthMiddleware(ctx);
        // if (isAuth) {
        //   return { ...isAuth, data: [] };
        // } else {
        const data = await prisma.products.findMany({
          where: {
            id: args.productID,
          },
        });

        if (data.length > 0) {
          return {
            message: "SUCCESS",
            error: false,
            data: data,
          };
        } else {
          return {
            message: "Product doesn't Exist in DB",
            error: true,
          };
        }
        // }
      },
    });
  },
});
