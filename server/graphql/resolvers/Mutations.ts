import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { mutationType, nonNull, stringArg } from "nexus";
import { prisma } from "../../index";
import { IContext } from "../../interface/context";
import { accessToken } from "../../utils/accessToken";
import { refreshToken } from "../../utils/refreshToken";
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

        const newUsername = `${args.name.split(" ")[0]}${
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
            data: {
              token: token,
              email: args.email,
              name: args.name,
              username: newUsername,
            },
            error: false,
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
                email: emailExists[0].email,
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
  },
});
