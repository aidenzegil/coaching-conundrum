import { coachingDBClient } from "#lib/coachingDBClient";
import { typesafeBlock } from "./block";

/* eslint-disable @typescript-eslint/naming-convention */
export const mutations = {
  createBlock: async ({
    startTime,
    endTime,
    creatorId,
  }: {
    startTime: Date;
    endTime: Date;
    creatorId: string;
  }) => {
    const block = await coachingDBClient.block.create({
      data: {
        startTime,
        endTime,
        userBlock: { create: { creatingUserId: creatorId } },
      },
      ...typesafeBlock,
    });
    return block;
  },
  deleteBlock: async (id: string) => {
    await coachingDBClient.block.delete({
      where: { id },
      ...typesafeBlock,
    });
  },
  updateBlock: async ({
    id,
    startTime,
    endTime,
    rating,
    notes,
  }: {
    id: string;
    startTime?: Date;
    endTime?: Date;
    rating?: number;
    notes?: string;
  }) => {
    const block = await coachingDBClient.block.update({
      where: { id },
      data: {
        startTime,
        endTime,
        rating,
        notes,
      },
      ...typesafeBlock,
    });
    return block;
  },
  bookBlock: async (id: string, userId: string) => {
    const block = await coachingDBClient.block.update({
      where: {
        id,
      },
      data: {
        userBlock: {
          update: { where: { blockId: id }, data: { bookingUserId: userId } },
        },
      },
      ...typesafeBlock,
    });
    return block;
  },
};
