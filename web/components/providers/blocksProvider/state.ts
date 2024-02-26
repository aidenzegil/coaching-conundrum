import { useState } from "react";
import { BlockProviderStateController } from "./types";

export const useBlockProviderStateController =
  (): BlockProviderStateController => {
    // #region State
    const [blocks, setBlocks] = useState([]);
    const [openBlocks, setOpenBlocks] = useState([]);
    const [createdBlocks, setCreatedBlocks] = useState([]);
    const [bookedBlocks, setBookedBlocks] = useState([]);
    const [openBlocksLoading, setOpenpenBlocksLoading] = useState(false);
    const [createdBlocksLoading, setCreatedBlocksLoading] = useState(false);
    const [bookedBlocksLoading, setBookedBlocksLoading] = useState(false);
    const [blocksLoading, setBlocksLoading] = useState(false);
    // #endregion

    const loading =
      openBlocksLoading ||
      createdBlocksLoading ||
      bookedBlocksLoading ||
      blocksLoading;

    return {
      state: {
        blocks: blocks,
        openBlocks: openBlocks,
        createdBlocks: createdBlocks,
        bookedBlocks: bookedBlocks,
      },
      set: {
        setBlocks,
        setOpenBlocks,
        setCreatedBlocks,
        setBookedBlocks,
      },
      // Network State
      setLoading: {
        setBlocksLoading,
        setOpenBlocksLoading: setOpenpenBlocksLoading,
        setCreatedBlocksLoading,
        setBookedBlocksLoading,
      },
      loading: {
        blocksLoading,
        openBlocksLoading,
        createdBlocksLoading,
        bookedBlocksLoading,
        loading,
      },
    };
  };
