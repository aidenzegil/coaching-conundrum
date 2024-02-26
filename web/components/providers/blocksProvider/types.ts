import { Dispatch, SetStateAction } from "react";
import {
  BlockOutputDTO,
  PrivateBlockOutputDto,
} from "../../../common/types/outputDtos";

export type BlockProviderState = {
  blocks: BlockOutputDTO[];
  openBlocks: PrivateBlockOutputDto[];
  createdBlocks: BlockOutputDTO[];
  bookedBlocks: BlockOutputDTO[];
};

export type BlockProviderLoading = {
  blocksLoading: boolean;
  openBlocksLoading: boolean;
  createdBlocksLoading: boolean;
  bookedBlocksLoading: boolean;
  loading: boolean;
};

export type BlockProviderSetLoading = {
  setBlocksLoading: Dispatch<SetStateAction<boolean>>;
  setOpenBlocksLoading: Dispatch<SetStateAction<boolean>>;
  setCreatedBlocksLoading: Dispatch<SetStateAction<boolean>>;
  setBookedBlocksLoading: Dispatch<SetStateAction<boolean>>;
};

export type BlockProviderStateController = {
  state: BlockProviderState;
  set: BlockProviderSet;
  // Network State
  setLoading: BlockProviderSetLoading;
  loading: BlockProviderLoading;
};

export type BlockProviderSet = {
  setBlocks: Dispatch<SetStateAction<BlockOutputDTO[]>>;
  setOpenBlocks: Dispatch<SetStateAction<PrivateBlockOutputDto[]>>;
  setCreatedBlocks: Dispatch<SetStateAction<BlockOutputDTO[]>>;
  setBookedBlocks: Dispatch<SetStateAction<BlockOutputDTO[]>>;
};

export type BlockProviderFunctions = {
  refreshOpenBlocks: () => Promise<void>;
  refreshCreatedBlocks: (userId: string) => Promise<void>;
  refreshBookedBlocks: (userId: string) => Promise<void>;
  createBlock: (startTime: Date, userId: string) => Promise<void>;
  bookBlock: (blockId: string, userId: string) => Promise<void>;
  updateBlock: (
    blockId: string,
    rating: number,
    notes: string
  ) => Promise<void>;
};
