import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
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
          const hashedPassword = await hash(args.password, 12);
          const obj = {
            name: args.name,
            username: `${args.name.split(" ")[0]}${
              Math.floor(Math.random() * 20) + 1
            }`,
            email: args.email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
          };
          await prisma.user.create({
            data: {
              ...obj,
            },
          });
          return {
            message: "Signup Successful",
            data: {
              email: emailExists[0].email,
              name: emailExists[0].name,
              username: emailExists[0].username,
            },
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
        console.log(emailExists);

        if (emailExists.length === 0) {
          return {
            message: "User doesn't Exist",
            error: true,
          };
        } else {
          if (await compare(args.password, emailExists[0].password)) {
            return {
              message: "Login Successful",
              data: {
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
