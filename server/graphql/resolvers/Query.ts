import { prisma } from "../../index";
import { IContext } from "../../interface/context";
import { ProductsResponse } from "../types/Product";
import { AuthMiddleware } from "../../utils/middlewareAuth";
import { intArg, list, nonNull, queryType, stringArg } from "nexus";
import { GetCartResponse, User } from "../rootSchema";

export const Query = queryType({
  definition(t) {
    t.field("getAllProducts", {
      type: ProductsResponse,
      resolve: async (parent, args, ctx: IContext) => {
        const data = await prisma.products.findMany();

        if (data) {
          return {
            message: "SUCCESS",
            error: false,
            data: data,
          };
        } else {
          return {
            message: "SUCCESS",
            error: false,
            data: [],
          };
        }
      },
    });

    t.field("getOneProduct", {
      type: ProductsResponse,
      args: {
        productID: nonNull(intArg()),
      },
      resolve: async (parent, args, ctx: IContext) => {
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
      },
    });

    t.field("getCartByID", {
      type: GetCartResponse,
      resolve: async (parent, args, ctx: IContext) => {
        const isAuth = AuthMiddleware(ctx);
        if (isAuth) {
          return { ...isAuth, data: [] };
        } else {
          //Get User ID
          const user = await prisma.user.findMany({
            where: {
              email: ctx.payload!.email,
            },
          });

          //If User Exists
          if (user.length > 0) {
            //Get Users Cart
            //Check if Cart Exists
            const shoppingCart = await prisma.shoppingCart.findMany({
              where: {
                userID: user[0].id,
              },
            });

            if (shoppingCart.length > 0) {
              //Get Cart Items
              const cartItems = await prisma.cartItems.findMany({
                where: {
                  shoppingCartID: shoppingCart[0].id,
                },
              });

              //Get ProductID List
              const productIDArray = cartItems.map((x) => x.productID);

              //Get Product Data
              const cartAndProductData = await prisma.products.findMany({
                where: {
                  id: { in: productIDArray },
                },
              });

              //Add Quantity Attribute
              const responseData = cartAndProductData.map((x, i) => {
                return { ...x, quantity: cartItems[i].quantity };
              });

              //Get
              return {
                message: "SUCCESS",
                error: false,
                data: responseData,
              };
            } else {
              return {
                message: "User has No Cart",
                error: false,
                data: [],
              };
            }
          } else {
            return {
              message: "User Not Found",
              error: true,
              data: [],
            };
          }
        }
      },
    });
  },
});
