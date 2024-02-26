import { UserType } from "@prisma/client";
import type { User } from "domain/user/models/user";

export class UserOutputDto {
  id: string;
  phoneNumber: string;
  bookedBlockIds: string[];
  createdBlockIds: string[];
  userType: UserType;

  constructor(user: User) {
    this.id = user.id;
    this.phoneNumber = user.phoneNumber;
    this.bookedBlockIds = user.bookedBlockIds;
    this.createdBlockIds = user.createdBlockIds;
    this.userType = user.userType;
  }
}
