export namespace params {
  export type GetBlock = GetBlockById;
  export type CreateBlock = {
    startTime: Date;
    endTime: Date;
    userId: string;
  };
  export type UpdateBlock = {
    id: string;
    rating?: number;
    notes?: string;
    startTime?: Date;
    endTime?: Date;
  };
  export type DeleteBlock = {
    id: string;
  };
  export type BookBlock = {
    id: string;
    userId: string;
  };
  export type GetBlocksCreatedByUser = {
    userId: string;
  };
  export type GetBlocksBookedByUser = {
    userId: string;
  };

  type GetBlockById = {
    discriminator: "id";
    id: string;
  };
}
