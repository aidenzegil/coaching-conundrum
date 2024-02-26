import { blockController } from "../../../lib/server/controllers/blocks/controller";
import { params } from "../../../lib/server/controllers/blocks/params";

export const network = {
  getOpenBlocks: async () => {
    return await blockController({}).GetOpenBlocks();
  },
  getBlocksCreatedByUser: async (params: params.GetBlocksCreatedByUser) => {
    return await blockController({}).GetBlocksCreatedByUser({ ...params });
  },
  getBlocksBookedByUser: async (params: params.GetBlocksBookedByUser) => {
    return await blockController({}).GetBlocksBookedByUser({ ...params });
  },
  getBlock: async (params: params.GetBlock) => {
    return await blockController({}).GetBlock({ ...params });
  },
  createBlock: async (params: params.CreateBlock) => {
    return await blockController({}).CreateBlock({ ...params });
  },
  bookBlock: async (params: params.BookBlock) => {
    return await blockController({}).BookBlock({ ...params });
  },
  updateBlock: async (params: params.UpdateBlock) => {
    return await blockController({}).UpdateBlock({
      ...params,
    });
  },
};
