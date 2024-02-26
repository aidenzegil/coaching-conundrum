import { UserType } from "@prisma/client";

export type User = {
  phoneNumber: string;
  id: string;
  userType: UserType;
  bookedBlockIds: string[];
  createdBlockIds: string[];
};
