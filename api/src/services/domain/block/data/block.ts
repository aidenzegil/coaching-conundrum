import { Prisma } from "@prisma/client";

export const typesafeBlock = Prisma.validator<Prisma.BlockDefaultArgs>()({
  include: {
    userBlock: true,
  },
});

export type DBBlock = Prisma.BlockGetPayload<typeof typesafeBlock>;
