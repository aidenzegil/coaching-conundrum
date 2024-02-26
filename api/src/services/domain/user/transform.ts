import type { DBUser } from "domain/user/data/user";
import type { User } from "domain/user/models/user";

export const transform = {
  user: (source: DBUser): User => {
    return {
      id: source.id,
      phoneNumber: source.phoneNumber,
      userType: source.userType,
      bookedBlockIds: source.bookedBlocks.map((block) => block.blockId),
      createdBlockIds: source.createdBlocks.map((block) => block.blockId),
    };
  },
};
