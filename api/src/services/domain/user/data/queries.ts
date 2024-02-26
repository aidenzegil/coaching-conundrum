import { type DBUser, typesafeUser } from "domain/user/data/user";

import { coachingDBClient } from "#lib/coachingDBClient";

export const queries = {
  getUserById: async (id: string): Promise<DBUser | null> => {
    const user = await coachingDBClient.user.findUnique({
      where: { id },
      ...typesafeUser,
    });
    return user;
  },
};
