import { params } from "./api.params";
import { Block } from "./models/block";

export interface BlockAPI {
  GetOpenBlocks: () => Promise<Block[]>;
  GetBlocksCreatedByUser: (params: params.GetBlocksCreatedByUser) => Promise<Block[]>;
  GetBlocksBookedByUser: (params: params.GetBlocksBookedByUser) => Promise<Block[]>;
  GetBlock: (params: params.GetBlock) => Promise<Block>;
  CreateBlock: (params: params.CreateBlock) => Promise<Block>;
  UpdateBlock: (params: params.UpdateBlock) => Promise<Block>;
  DeleteBlock: (params: params.DeleteBlock) => Promise<void>;
  BookBlock: (params: params.BookBlock) => Promise<Block>;
}
