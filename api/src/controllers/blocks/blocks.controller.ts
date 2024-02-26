import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { ApiResponse } from "#controllers/types/response.dto";

import { BlockOutputDTO, PrivateBlockOutputDto } from "./dto/output.dto";
import { BlockService } from "domain/block/block.service";
import { UserService } from "domain/user/user.service";

import * as InputDto from "./dto/input.dto";

@ApiTags("blocks")
@Controller("blocks")
export class BlocksController {
  constructor(
    private readonly blockService: BlockService,
    private readonly userService: UserService,
  ) {}
  @Get("/")
  async GetBlocks(): ApiResponse<PrivateBlockOutputDto[]> {
    const blocks = await this.blockService.GetOpenBlocks();
    const dtos = blocks.map((block) => new PrivateBlockOutputDto(block));
    return { data: dtos };
  }
  @Get("/created/:userId")
  async GetBlocksCreatedByUser(
    @Param("userId") userId: string,
  ): ApiResponse<BlockOutputDTO[]> {
    const rawBlocks = await this.blockService.GetBlocksCreatedByUser({
      userId,
    });
    const dtos = await Promise.all(
      rawBlocks.map(async (block) => {
        const bookingUser = block.bookingUserId
          ? await this.userService.GetUser({
              discriminator: "id",
              id: block.bookingUserId,
            })
          : undefined;
        const creatingUser = await this.userService.GetUser({
          discriminator: "id",
          id: block.createdUserId,
        });
        return new BlockOutputDTO(block, creatingUser, bookingUser);
      }),
    );
    return { data: dtos };
  }
  @Get("/booked/:userId")
  async GetBlocksBookedByUser(
    @Param("userId") userId: string,
  ): ApiResponse<BlockOutputDTO[]> {
    const rawBlocks = await this.blockService.GetBlocksBookedByUser({
      userId,
    });
    const dtos = await Promise.all(
      rawBlocks.map(async (block) => {
        const bookingUser = block.bookingUserId
          ? await this.userService.GetUser({
              discriminator: "id",
              id: block.bookingUserId,
            })
          : undefined;
        const creatingUser = await this.userService.GetUser({
          discriminator: "id",
          id: block.createdUserId,
        });
        return new BlockOutputDTO(block, creatingUser, bookingUser);
      }),
    );
    return { data: dtos };
  }
  @Get(":blockId")
  async GetBlock(
    @Param("blockId") blockId: string,
  ): ApiResponse<BlockOutputDTO> {
    const block = await this.blockService.GetBlock({
      discriminator: "id",
      id: blockId,
    });
    const bookingUser = block.bookingUserId
      ? await this.userService.GetUser({
          discriminator: "id",
          id: block.bookingUserId,
        })
      : undefined;
    const creatingUser = await this.userService.GetUser({
      discriminator: "id",
      id: block.createdUserId,
    });
    const dto = new BlockOutputDTO(block, creatingUser, bookingUser);
    return { data: dto };
  }
  @Put("/book")
  async BookBlock(
    @Body() inputDto: InputDto.BookBlockInputDto,
  ): ApiResponse<BlockOutputDTO> {
    const block = await this.blockService.BookBlock({
      id: inputDto.blockId,
      userId: inputDto.userId,
    });
    const bookingUser = block.bookingUserId
      ? await this.userService.GetUser({
          discriminator: "id",
          id: block.bookingUserId,
        })
      : undefined;
    const creatingUser = await this.userService.GetUser({
      discriminator: "id",
      id: block.createdUserId,
    });
    const dto = new BlockOutputDTO(block, creatingUser, bookingUser);
    return { data: dto };
  }
  @Put("/updateBlock")
  async UpdateBlock(
    @Body() inputDto: InputDto.UpdateBlockInputDto,
  ): ApiResponse<BlockOutputDTO> {
    const block = await this.blockService.UpdateBlock({
      id: inputDto.blockId,
      startTime: inputDto.startTime,
      endTime: inputDto.endTime,
      rating: inputDto.rating,
      notes: inputDto.notes,
    });
    const bookingUser = block.bookingUserId
      ? await this.userService.GetUser({
          discriminator: "id",
          id: block.bookingUserId,
        })
      : undefined;
    const creatingUser = await this.userService.GetUser({
      discriminator: "id",
      id: block.createdUserId,
    });
    const dto = new BlockOutputDTO(block, creatingUser, bookingUser);
    return { data: dto };
  }
  @Post("/")
  async CreateBlock(
    @Body() inputDto: InputDto.CreateBlockInputDto,
  ): ApiResponse<BlockOutputDTO> {
    const block = await this.blockService.CreateBlock({
      userId: inputDto.userId,
      startTime: inputDto.startTime,
      endTime: inputDto.endTime,
    });
    const bookingUser = block.bookingUserId
      ? await this.userService.GetUser({
          discriminator: "id",
          id: block.bookingUserId,
        })
      : undefined;
    const creatingUser = await this.userService.GetUser({
      discriminator: "id",
      id: block.createdUserId,
    });
    const dto = new BlockOutputDTO(block, creatingUser, bookingUser);
    return { data: dto };
  }
}
