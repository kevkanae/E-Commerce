import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { booleanArg, intArg, mutationType, nonNull, stringArg } from "nexus";
import { prisma } from "../../index";
import { IContext } from "../../interface/context";
import { accessToken } from "../../utils/accessToken";
import { AuthMiddleware } from "../../utils/middlewareAuth";
import { refreshToken } from "../../utils/refreshToken";
import { CartResponse } from "../rootSchema";
import { AuthResponse } from "../types/Auth";

export const Mutation = mutationType({
  definition(t) {
    t.field("signup", {
      type: AuthResponse,
      args: {
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, ctx: IContext) => {
        let emailExists: User[] = [];
        emailExists = await prisma.user.findMany({
          where: {
            email: args.email,
          },
        });

        const newUsername: string = `${args.name.split(" ")[0]}${
          Math.floor(Math.random() * 20) + 1
        }`;

        if (emailExists.length === 0) {
          //Hash Password
          const hashedPassword = await hash(args.password, 12);

          //Insert Data
          await prisma.user.create({
            data: {
              ...{
                name: args.name,
                username: newUsername,
                email: args.email,
                password: hashedPassword,
                createdAt: new Date().toISOString(),
              },
            },
          });

          //Access Token
          const token = accessToken(args.email);

          //Refresh Token
          ctx.res.cookie("yum", refreshToken(args.email), { httpOnly: true });

          return {
            message: "Signup Successful",
            error: false,
            data: {
              token: token,
              email: args.email,
              name: args.name,
              username: newUsername,
            },
          };
        } else {
          return {
            message: "User Exists",
            error: true,
            data: {
              email: args.email,
              name: args.name,
              username: newUsername,
            },
          };
        }
      },
    });

    t.field("login", {
      type: AuthResponse,
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },

      resolve: async (_parent, args, ctx: IContext) => {
        let emailExists: User[] = [];
        emailExists = await prisma.user.findMany({
          where: {
            email: args.email,
          },
        });

        if (emailExists.length === 0) {
          return {
            message: "User doesn't Exist",
            error: true,
          };
        } else {
          if (await compare(args.password, emailExists[0].password)) {
            //Access Token
            const token = accessToken(args.email);

            //Refresh Token
            ctx.res.cookie("yum", refreshToken(args.email), { httpOnly: true });

            return {
              message: "Login Successful",
              data: {
                token: token,
                email: args.email,
                name: emailExists[0].name,
                username: emailExists[0].username,
              },
              error: false,
            };
          } else {
            return {
              message: "Incorrect Password",
              data: {
                email: emailExists[0].email,
              },
              error: true,
            };
          }
        }
      },
    });

    t.field("addToCart", {
      type: CartResponse,
      args: {
        productID: nonNull(intArg()),
      },

      resolve: async (_parent, args, ctx: IContext) => {
        const isAuth = AuthMiddleware(ctx);
        if (isAuth) {
          return { ...isAuth, data: [] };
        } else {
          // Get Product ID
          const product = await prisma.products.findMany({
            where: {
              id: args.productID,
            },
          });

          //Get User ID
          const user = await prisma.user.findMany({
            where: {
              email: ctx.payload!.email,
            },
          });

          if (product.length > 0 && user.length > 0) {
            //Check if Cart Exists for the User
            const cartExists = await prisma.shoppingCart.findMany({
              where: {
                userID: user[0].id,
              },
            });

            if (cartExists.length > 0) {
              //Check if Product Exists in Cart Items
              const productExists = await prisma.cartItems.findMany({
                where: {
                  productID: product[0].id,
                },
              });

              if (productExists.length > 0) {
                //Increment Quantity
                const oldCartItem = await prisma.cartItems.update({
                  where: {
                    id: productExists[0].id,
                  },
                  data: {
                    quantity: productExists[0].quantity + 1,
                  },
                });

                return {
                  message: "Added to Cart Successfully",
                  error: false,
                };
              } else {
                //Add to Cart Items
                const cartItem = await prisma.cartItems.create({
                  data: {
                    quantity: 1,
                    createdDate: new Date().toISOString(),
                    productID: product[0].id,
                    shoppingCartID: cartExists[0].id,
                  },
                });

                return {
                  message: "Added to Cart Successfully",
                  error: false,
                };
              }
            } else {
              //Create a new cart
              console.log(typeof user[0].id);

              const newCart = await prisma.shoppingCart.create({
                data: {
                  userID: user[0].id,
                  createdAt: new Date().toISOString(),
                },
              });

              //Add to Cart Items
              const cartItem = await prisma.cartItems.create({
                data: {
                  quantity: 1,
                  createdDate: new Date().toISOString(),
                  productID: product[0].id,
                  shoppingCartID: newCart.id,
                },
              });

              return {
                message: "Added to Cart Successfully",
                error: false,
              };
            }
          } else {
            if (product.length <= 0) {
              return {
                message: "Product doesn't Exist in DB",
                error: true,
              };
            } else {
              return {
                message: "Server Error",
                error: true,
              };
            }
          }
        }
      },
    });

    t.field("modifyQuantity", {
      type: CartResponse,
      args: {
        productID: nonNull(intArg()),
        isInc: nonNull(booleanArg()),
      },

      resolve: async (_parent, args, ctx: IContext) => {
        const isAuth = AuthMiddleware(ctx);
        if (isAuth) {
          return { ...isAuth, data: [] };
        } else {
          // Get Product ID
          const product = await prisma.products.findMany({
            where: {
              id: args.productID,
            },
          });

          //Get User ID
          const user = await prisma.user.findMany({
            where: {
              email: ctx.payload!.email,
            },
          });

          if (product.length > 0 && user.length > 0) {
            //Check if Cart Exists for the User
            const cartExists = await prisma.shoppingCart.findMany({
              where: {
                userID: user[0].id,
              },
            });

            if (cartExists.length > 0) {
              //Check if Product Exists in Cart Items
              const productExists = await prisma.cartItems.findMany({
                where: {
                  productID: product[0].id,
                },
              });

              if (productExists.length > 0) {
                //Increment Quantity
                const oldCartItem = await prisma.cartItems.update({
                  where: {
                    id: productExists[0].id,
                  },
                  data: {
                    quantity: args.isInc
                      ? productExists[0].quantity + 1
                      : productExists[0].quantity - 1,
                  },
                });

                return {
                  message: "Updated Cart Successfully",
                  error: false,
                };
              } else {
                //No Cart Found
                return {
                  message: "Product not Found in Cart",
                  error: true,
                };
              }
            } else {
              //No Cart Found
              return {
                message: "No Cart Found",
                error: true,
              };
            }
          } else {
            if (product.length <= 0) {
              return {
                message: "Product doesn't Exist in DB",
                error: true,
              };
            } else {
              return {
                message: "Server Error",
                error: true,
              };
            }
          }
        }
      },
    });
  },
});
