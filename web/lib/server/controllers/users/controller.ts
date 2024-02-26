import { Err, Ok } from "../../../../common/types/result";
import { User } from "../../../../common/types/user";
import { GET, POST } from "../../api/axiosInstance";
import { ApiResponse } from "../../types/apiResponse";
import { params } from "./params";

interface Dependencies {}
interface Methods {
  getUser: (params: params.GetUser) => Promise<ApiResponse<User>>;
}

type UserController = (deps: Dependencies) => Methods;

/**
 * User Controller
 * @returns UserController object
 */
export const userController: UserController = () => ({
  /**
   * Get a user by username
   * @param id The user id of the user to retrieve
   * @returns Promise that resolves to an ApiResponse containing a user object if successful, otherwise an error
   */
  getUser: async ({ id }): Promise<ApiResponse<User>> => {
    const res = await GET<User>({
      path: `/users/${id}`,
    });
    if (res.isOk()) {
      const user: User = {
        id: res.value.id,
        phoneNumber: res.value.phoneNumber,
        userType: res.value.userType,
        bookedBlockIds: res.value.bookedBlockIds,
        createdBlockIds: res.value.createdBlockIds,
      };
      return Ok(user);
    }
    return Err(res.error);
  },
});
