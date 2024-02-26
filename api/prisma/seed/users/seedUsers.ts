import type { PrismaClient, User, UserType } from "@prisma/client";

const users: { phoneNumber: string; userType: UserType }[] = [
  {
    phoneNumber: "333-456-7890",
    userType: "COACH",
  },
  {
    phoneNumber: "222-456-7890",
    userType: "COACH",
  },
  {
    phoneNumber: "333-456-7890",
    userType: "STUDENT",
  },
  {
    phoneNumber: "444-456-7890",
    userType: "STUDENT",
  },
];

const seed = async (prismaClient: PrismaClient): Promise<User[]> => {
  console.log("Seeding users");
  const dbUsers = await Promise.all(
    users.map(async (user) => {
      return prismaClient.user.create({
        data: {
          phoneNumber: user.phoneNumber,
          userType: user.userType,
        },
      });
    }),
  );

  return dbUsers;
};

export default seed;
