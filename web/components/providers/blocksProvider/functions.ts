import { useEffect } from "react";
import { network } from "./network";
import { BlockProviderFunctions, BlockProviderStateController } from "./types";
import { User } from "../../../common/types/user";

export const useBlocksProviderFunctions = (
  stateController: BlockProviderStateController,
  user?: User
): BlockProviderFunctions => {
  useEffect(() => {
    if (user) {
      refreshOpenBlocks();
      refreshCreatedBlocks(user.id);
      refreshBookedBlocks(user.id);
    }
  }, [user]);
  const refreshOpenBlocks = async () => {
    stateController.setLoading.setOpenBlocksLoading(true);
    const openBlocks = await network.getOpenBlocks();
    stateController.set.setOpenBlocks(openBlocks.value);
    stateController.setLoading.setOpenBlocksLoading(false);
  };
  const refreshCreatedBlocks = async (userId: string) => {
    stateController.setLoading.setCreatedBlocksLoading(true);
    const createdBlocks = await network.getBlocksCreatedByUser({ userId });
    stateController.set.setCreatedBlocks(createdBlocks.value);
    stateController.setLoading.setCreatedBlocksLoading(false);
  };
  const refreshBookedBlocks = async (userId: string) => {
    stateController.setLoading.setBookedBlocksLoading(true);
    const bookedBlocks = await network.getBlocksBookedByUser({ userId });
    stateController.set.setBookedBlocks(bookedBlocks.value);
    stateController.setLoading.setBookedBlocksLoading(false);
  };
  const createBlock = async (startTime: Date, userId: string) => {
    stateController.setLoading.setCreatedBlocksLoading(true);
    var endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + 2);
    await network.createBlock({ startTime, endTime, userId });
    await refreshCreatedBlocks(userId);
    refreshOpenBlocks(); // Dev code, testing purposes
    stateController.setLoading.setCreatedBlocksLoading(false);
  };
  const bookBlock = async (blockId: string, userId: string) => {
    stateController.setLoading.setBookedBlocksLoading(true);
    await network.bookBlock({ blockId, userId });
    await refreshBookedBlocks(userId);
    refreshOpenBlocks();
    stateController.setLoading.setBookedBlocksLoading(false);
  };
  const updateBlock = async (
    blockId: string,
    rating: number,
    notes: string
  ) => {
    await network.updateBlock({ blockId, rating, notes });
    await refreshOpenBlocks(); // FIXME: should be refresh created blocks
  };
  return {
    refreshOpenBlocks,
    refreshCreatedBlocks,
    refreshBookedBlocks,
    createBlock,
    bookBlock,
    updateBlock,
  };
};
