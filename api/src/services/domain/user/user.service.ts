import { Injectable } from "@nestjs/common";
import { queries } from "domain/user/data/queries";
import { transform } from "domain/user/transform";
import { NotFoundError } from "src/common/errors/NotFoundError";
import type { UserApi } from "src/services/domain/user/api.interface";
import type { params } from "src/services/domain/user/api.params";
import type { User } from "src/services/domain/user/models/user";

@Injectable()
export class UserService implements UserApi {
  /** Get a user */
  GetUser: (params: params.GetUser) => Promise<User> = async (params) => {
    const dbUser = await (async () => {
      switch (params.discriminator) {
        case "id":
          return queries.getUserById(params.id);
      }
    })();

    if (!dbUser) {
      throw new NotFoundError({ message: "User not found" });
    }

    const user = transform.user(dbUser);

    return user;
  };
}
