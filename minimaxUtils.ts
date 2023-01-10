import { GameStateType, TreeNode } from "./utils";
import _ from "lodash";

export const cloneState = (state: GameStateType) => {
    return state.map(row => [...row]);
};

// Given a game state following the opponent's move, return the child with an identical state.
export const updateNode = (currentNode: TreeNode, newGameState: GameStateType) => {
    const gameStateString = JSON.stringify(newGameState);
      const newRoot =
        currentNode.children.find(
          (child) => JSON.stringify(child.state) === gameStateString
        )
    if(!newRoot) throw Error("No child found with a game state matching the one provided")
    return newRoot;
}

// Select the next game state using the minimax tree graph
export const makeMove = (node: TreeNode, player: "X" | "O") => {
    const isMax = player === "X"
    const sortAlgo = (a: TreeNode, b: TreeNode) =>  isMax ? b.score! - a.score! : a.score! - b.score!
    // Shuffling the children adds an element of randomness when there are multiple optimal moves
    const newNode = _.shuffle(node.children).sort(sortAlgo)[0] 
    return newNode;
}
