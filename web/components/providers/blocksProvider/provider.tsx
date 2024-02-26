import React, { useContext, useMemo } from "react";
import { useBlockProviderStateController } from "./state";
import { useBlocksProviderFunctions } from "./functions";
import {
  BlockProviderFunctions,
  BlockProviderLoading,
  BlockProviderState,
  BlockProviderStateController,
} from "./types";
import { createRegisteredContext } from "react-singleton-context";
import { useUserContext } from "../userProvider/provider";

type BlocksProviderContext = Omit<
  BlockProviderStateController,
  "set" | "setLoading"
> & {
  blockFunctions: BlockProviderFunctions;
};

const defaultProvider: BlocksProviderContext = {
  state: {
    blocks: [],
    openBlocks: [],
    createdBlocks: [],
    bookedBlocks: [],
  },
  loading: {
    blocksLoading: false,
    openBlocksLoading: false,
    createdBlocksLoading: false,
    bookedBlocksLoading: false,
    loading: false,
  },
  blockFunctions: {
    refreshOpenBlocks: async () => {},
    refreshCreatedBlocks: async (userId: string) => {},
    refreshBookedBlocks: async (userId: string) => {},
    createBlock: async (startTime: Date, userId: string) => {},
    bookBlock: async (blockId: string, userId: string) => {},
    updateBlock: async (blockId: string, rating: number, notes: string) => {},
  },
};

const BlocksContext = createRegisteredContext<BlocksProviderContext>(
  "blocks-provider-context",
  defaultProvider
);

// Create the context provider
export const BlocksContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUserContext();
  if (!user) {
    return children;
  }
  const stateController = useBlockProviderStateController();
  const blocksFunctions = useBlocksProviderFunctions(stateController, user);

  const value = useProviderInterface(
    stateController.state,
    blocksFunctions,
    stateController.loading
  );

  // Wrap the children with the context provider
  return (
    <BlocksContext.Provider value={value}>{children}</BlocksContext.Provider>
  );
};

const useProviderInterface = (
  state: BlockProviderState,
  blockFunctions: BlockProviderFunctions,
  loading: BlockProviderLoading
): BlocksProviderContext => {
  return useMemo(
    () => ({
      state,
      blockFunctions,
      loading,
    }),
    [state, loading.loading]
  );
};

export const useBlocksContext = () => useContext(BlocksContext);
