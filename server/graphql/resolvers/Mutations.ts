import { User } from "@prisma/client";
import { mutationType, nonNull, stringArg } from "nexus";
import { prisma } from "../../index";
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
      resolve: async (_parent, args, ctx) => {
        let emailExists: User[] = [];
        emailExists = await prisma.user.findMany({
          where: {
            email: args.email,
          },
        });
        if (emailExists.length === 0) {
          const obj = {
            name: args.name,
            username: `${args.name.split(" ")[0]}${
              Math.floor(Math.random() * 20) + 1
            }`,
            email: args.email,
            password: args.password,
            createdAt: new Date().toISOString(),
          };
          await prisma.user.create({
            data: {
              ...obj,
            },
          });
          return {
            message: "Signup Successful",
            error: false,
          };
        } else {
          return {
            message: "User Exists",
            error: true,
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
      resolve: async (_parent, args, ctx) => {
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
          return {
            message: "Login Successful",
            error: false,
          };
        }
      },
    });
  },
});
