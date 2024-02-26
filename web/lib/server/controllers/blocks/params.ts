export namespace params {
  export type GetOpenBlocks = {};
  export type GetBlocksCreatedByUser = {
    userId: string;
  };
  export type GetBlocksBookedByUser = {
    userId: string;
  };
  export type GetBlock = {
    blockId: string;
  };
  export type CreateBlock = {
    userId: string;
    startTime: Date;
    endTime: Date;
  };
  export type BookBlock = {
    userId: string;
    blockId: string;
  };
  export type UpdateBlock = {
    blockId: string;
    startTime?: string;
    endTime?: string;
    rating?: number;
    notes?: string;
  };
}
