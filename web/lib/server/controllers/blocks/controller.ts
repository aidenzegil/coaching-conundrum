import {
  BlockOutputDTO,
  PrivateBlockOutputDto,
} from "../../../../common/types/outputDtos";
import { Err, Ok } from "../../../../common/types/result";
import { GET, POST, PUT } from "../../api/axiosInstance";
import { ApiResponse } from "../../types/apiResponse";
import { params } from "./params";

interface Dependencies {}
interface Methods {
  GetOpenBlocks: () => Promise<ApiResponse<PrivateBlockOutputDto[]>>;
  GetBlocksCreatedByUser: (
    params: params.GetBlocksCreatedByUser
  ) => Promise<ApiResponse<BlockOutputDTO[]>>;
  GetBlocksBookedByUser: (
    params: params.GetBlocksBookedByUser
  ) => Promise<ApiResponse<BlockOutputDTO[]>>;
  GetBlock: (params: params.GetBlock) => Promise<ApiResponse<BlockOutputDTO>>;
  CreateBlock: (
    params: params.CreateBlock
  ) => Promise<ApiResponse<BlockOutputDTO>>;
  BookBlock: (params: params.BookBlock) => Promise<ApiResponse<BlockOutputDTO>>;
  UpdateBlock: (
    params: params.UpdateBlock
  ) => Promise<ApiResponse<BlockOutputDTO>>;
}

type BlockController = (deps: Dependencies) => Methods;

/**
 * User Controller
 * @returns UserController object
 */
export const blockController: BlockController = () => ({
  GetOpenBlocks: async (): Promise<ApiResponse<PrivateBlockOutputDto[]>> => {
    const res = await GET<PrivateBlockOutputDto[]>({
      path: `/blocks/`,
    });
    if (res.isOk()) {
      return Ok(res.value);
    }
    return Err(res.error);
  },
  GetBlocksCreatedByUser: async ({
    userId,
  }): Promise<ApiResponse<BlockOutputDTO[]>> => {
    const res = await GET<BlockOutputDTO[]>({
      path: `/blocks/created/${userId}`,
    });
    if (res.isOk()) {
      return Ok(res.value);
    }
    return Err(res.error);
  },
  GetBlocksBookedByUser: async ({
    userId,
  }): Promise<ApiResponse<BlockOutputDTO[]>> => {
    const res = await GET<BlockOutputDTO[]>({
      path: `/blocks/booked/${userId}`,
    });
    if (res.isOk()) {
      return Ok(res.value);
    }
    return Err(res.error);
  },
  GetBlock: async ({ blockId }): Promise<ApiResponse<BlockOutputDTO>> => {
    const res = await GET<BlockOutputDTO>({
      path: `/blocks/${blockId}`,
    });
    if (res.isOk()) {
      return Ok(res.value);
    }
    return Err(res.error);
  },
  CreateBlock: async ({
    userId,
    startTime,
    endTime,
  }): Promise<ApiResponse<BlockOutputDTO>> => {
    const res = await POST<BlockOutputDTO>({
      path: `/blocks/`,
      body: {
        userId,
        startTime,
        endTime,
      },
    });
    if (res.isOk()) {
      return Ok(res.value);
    }
    return Err(res.error);
  },
  BookBlock: async ({
    userId,
    blockId,
  }): Promise<ApiResponse<BlockOutputDTO>> => {
    const res = await PUT<BlockOutputDTO>({
      path: `/blocks/book`,
      body: {
        userId,
        blockId,
      },
    });
    if (res.isOk()) {
      return Ok(res.value);
    }
    return Err(res.error);
  },
  UpdateBlock: async ({
    blockId,
    startTime,
    endTime,
    rating,
    notes,
  }): Promise<ApiResponse<BlockOutputDTO>> => {
    const res = await PUT<BlockOutputDTO>({
      path: `/blocks/updateBlock`,
      body: {
        blockId,
        startTime,
        endTime,
        rating,
        notes,
      },
    });
    if (res.isOk()) {
      return Ok(res.value);
    }
    return Err(res.error);
  },
});
