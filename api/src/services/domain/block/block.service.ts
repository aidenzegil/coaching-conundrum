import { Injectable } from "@nestjs/common";
import { mutations } from "./data/mutations";
import { queries } from "./data/queries";
import { transform } from "./transform";
import { NotFoundError } from "src/common/errors/NotFoundError";
import type { params } from "./api.params";
import { BlockAPI } from "./api.interface";
import { Block } from "./models/block";

@Injectable()
export class BlockService implements BlockAPI {
  GetOpenBlocks: () => Promise<Block[]> = async () => {
    const dbBlocks = await queries.getOpenBlocks();
    const blocks = dbBlocks.map(transform.block);
    return blocks;
  };
  GetBlocksCreatedByUser: (
    params: params.GetBlocksCreatedByUser,
  ) => Promise<Block[]> = async (params) => {
    const dbBlocks = await queries.getBlocksCreatedByUser(params.userId);
    const blocks = dbBlocks.map(transform.block);
    return blocks;
  };
  GetBlocksBookedByUser: (
    params: params.GetBlocksBookedByUser,
  ) => Promise<Block[]> = async (params) => {
    const dbBlocks = await queries.getBlocksBookedByUser(params.userId);
    const blocks = dbBlocks.map(transform.block);
    return blocks;
  };
  GetBlock: (params: params.GetBlock) => Promise<Block> = async (params) => {
    const dbBlock = await (async () => {
      switch (params.discriminator) {
        case "id":
          return queries.getBlockById(params.id);
      }
    })();

    if (!dbBlock) {
      throw new NotFoundError({ message: "Block not found" });
    }

    const block = transform.block(dbBlock);

    return block;
  };
  UpdateBlock: (params: params.UpdateBlock) => Promise<Block> = async (
    params,
  ) => {
    try {
      await mutations.updateBlock({ ...params });
    } catch (error) {
      throw new Error("Error updating block");
    }
    return this.GetBlock({ discriminator: "id", id: params.id });
  };
  CreateBlock: (params: params.CreateBlock) => Promise<Block> = async (
    params,
  ) => {
    const dbBlock = await mutations.createBlock({
      ...params,
      creatorId: params.userId,
    });
    return this.GetBlock({ discriminator: "id", id: dbBlock.id });
  };
  DeleteBlock: (params: params.DeleteBlock) => Promise<void> = async (
    params,
  ) => {
    await mutations.deleteBlock(params.id);
  };
  BookBlock: (params: params.BookBlock) => Promise<Block> = async (params) => {
    await mutations.bookBlock(params.id, params.userId);
    return this.GetBlock({ discriminator: "id", id: params.id });
  };
}
