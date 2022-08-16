import { list, nonNull, queryType } from "nexus";
import { prisma } from "../../index";

export const Query = queryType({
  definition(t) {
    t.field("getAllUsers", {
      type: nonNull(list("User")),
      resolve: (parent, args) => {
        return prisma.user.findMany();
      },
    });
  },
});
