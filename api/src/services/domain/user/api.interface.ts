import type { params } from "domain/user/api.params";
import type { User } from "domain/user/models/user";

export interface UserApi {
  GetUser: (params: params.GetUser) => Promise<User>;
}
