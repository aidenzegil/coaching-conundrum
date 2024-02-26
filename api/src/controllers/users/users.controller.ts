import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "src/services/domain/user/user.service";

import { ApiResponse } from "#controllers/types/response.dto";

import { UserOutputDto } from "./dto/output.dto";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get(":userId")
  async GetUser(@Param("userId") userId: string): ApiResponse<UserOutputDto> {
    const user = await this.userService.GetUser({
      discriminator: "id",
      id: userId,
    });
    const dto = new UserOutputDto(user);
    return { data: dto };
  }
}
