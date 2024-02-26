import { coachingDBClient } from "#lib/coachingDBClient";
import { DBBlock, typesafeBlock } from "./block";

export const queries = {
  getBlocksCreatedByUser: async (userId: string): Promise<DBBlock[]> => {
    const blocks = await coachingDBClient.block.findMany({
      where: { userBlock: { creatingUserId: userId } },
      ...typesafeBlock,
    });
    return blocks;
  },
  getBlocksBookedByUser: async (userId: string): Promise<DBBlock[]> => {
    const blocks = await coachingDBClient.block.findMany({
      where: { userBlock: { bookingUserId: userId } },
      ...typesafeBlock,
    });
    return blocks;
  },
  getBlockById: async (id: string): Promise<DBBlock | null> => {
    const block = await coachingDBClient.block.findUnique({
      where: { id },
      ...typesafeBlock,
    });
    return block;
  },
  getOpenBlocks: async (): Promise<DBBlock[]> => {
    const blocks = await coachingDBClient.block.findMany({
      where: { userBlock: { bookingUserId: null } },
      ...typesafeBlock,
    });
    return blocks;
  },
};
