import { list, nonNull, queryType } from "nexus";
import { prisma } from "../../index";
import { IContext } from "../../interface/context";
import { AuthMiddleware } from "../../utils/middlewareAuth";
import { ProductResponse } from "../types/Product";

export const Query = queryType({
  definition(t) {
    t.field("getAllUsers", {
      type: nonNull(list("User")),
      resolve: (parent, args) => {
        return prisma.user.findMany();
      },
    });

    t.field("getSomeProducts", {
      type: ProductResponse,
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
      type: ProductResponse,
      resolve: async (parent, args, ctx: IContext) => {
        const isAuth = AuthMiddleware(ctx);
        if (isAuth) {
          return { ...isAuth, data: [] };
        } else {
          const data = await prisma.products.findMany();

          return {
            message: "SUCCESS",
            error: false,
            data: data,
          };
        }
      },
    });
  },
});
