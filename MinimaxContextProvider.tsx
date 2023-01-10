import React, { createContext, useEffect, useState } from "react";
import { TreeNode, GameStateType } from "./utils";
import { updateNode, makeMove, cloneState } from "./minimaxUtils";

type Props = {
  children: React.ReactNode;
};

export const MinimaxTreeGraphContext = createContext<
  [
    currentNode?: TreeNode,
    makeAgentMove?:
      | ((
          currentGameState: GameStateType,
          isPlayerFirst: boolean,
          player: "X" | "O"
        ) => GameStateType)
      | undefined,
    resetTree?: () => void
  ]
>([undefined, undefined, undefined]);

// Context provider fetches and provides the minimax tree graph.
// As well as functions to reset and traverse the graph
export function MinimaxContextProvider({ children }: Props) {
  const [currentNode, setCurrentNode] = useState<TreeNode | undefined>(
    undefined
  );
  const [rootNode, setRootNode] = useState<TreeNode | undefined>(undefined);

  // Reset to the root node of the graph
  const resetTree = () => {
    setCurrentNode(rootNode);
  };

  // Given a current game state and some initial game information,
  // return the game state following an optimal move by the agent
  const makeAgentMove = (
    currentGameState: GameStateType,
    isPlayerFirst: boolean,
    player: "X" | "O"
  ) => {
    if (!currentNode) throw Error("graph not fetched");
    const root =
      !isPlayerFirst && Boolean(currentNode.isRoot)
        ? currentNode
        : updateNode(currentNode, currentGameState); // If agent is first then initially it should make the move on the root node

    const newRoot = makeMove(root, player);
    setCurrentNode(newRoot);
    return cloneState(newRoot.state);
  };

  // Initially fetch the tree graph saved in a bucket on google cloud
  useEffect(() => {
    const fetchMiniMaxTreeGraph = async () => {
      const url = process.env.MINIMAX_TREE_GRAPH_URL;
      if (!url) throw Error("missing url to fetch the minimax tree graph");
      const graph = (await (await fetch(url)).json()) satisfies TreeNode[];
      setCurrentNode(graph);
      setRootNode(graph);
    };
    fetchMiniMaxTreeGraph();
  }, []);

  return (
    <MinimaxTreeGraphContext.Provider
      value={[currentNode, makeAgentMove, resetTree]}
    >
      {children}
    </MinimaxTreeGraphContext.Provider>
  );
}
