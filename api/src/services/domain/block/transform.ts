import { DBBlock } from "./data/block";
import { Block } from "./models/block";

export const transform = {
  block: (source: DBBlock): Block => {
    if (!source.userBlock) {
      throw new Error("Block is missing userBlock data.");
    }
    return {
      id: source.id,
      startTime: source.startTime,
      endTime: source.endTime,
      rating: source.rating,
      notes: source.notes,
      createdUserId: source.userBlock?.creatingUserId,
      bookingUserId: source.userBlock?.bookingUserId,
    };
  },
};
