import { Prisma } from "@prisma/client";

export const typesafeUser = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    bookedBlocks: true,
    createdBlocks: true,
  },
});

export type DBUser = Prisma.UserGetPayload<typeof typesafeUser>;
