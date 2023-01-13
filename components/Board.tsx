import React, { FC, useCallback, useContext, useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Cell from "./Cell";
import {
  createInitialGameState,
  fetchMCTSMove,
  GameStateType,
  switchPlayers,
} from "../utils";
import { cloneState } from "../minimaxUtils";
import { MinimaxTreeGraphContext } from "../MinimaxContextProvider";

type Props = {
  gridSize: 3 | 4 | 5;
  onGameStateChange?: (gameState: GameStateType, Player: "X" | "O") => void;
  isGameOver?: boolean;
  isPlayerFirst: boolean;
};

const Board: FC<Props> = ({
  gridSize,
  onGameStateChange,
  isGameOver = false,
  isPlayerFirst,
}) => {
  const [gameState, setGameState] = useState(createInitialGameState(gridSize));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [isPlayerTurn, setIsPlayerTurn] = useState(isPlayerFirst); // False for the agent true for the human
  const [, makeMinimaxMove, resetTree] = useContext(MinimaxTreeGraphContext);
  const isMinimMax = gridSize === 3;

  useEffect(() => {
    return () => {
      // The current node of the tree should be reset when the component unmounts (i.e the game is over)
      resetTree?.();
    };
  }, []);

  const prepareNextTurn = (newGameState: GameStateType) => {
    setGameState(newGameState);
    onGameStateChange?.(newGameState, currentPlayer);
    setCurrentPlayer(switchPlayers(currentPlayer));
    setIsPlayerTurn(!isPlayerTurn);
  };

  const playerUpdateGameState = (row: number, column: number) => {
    const newGameState = cloneState(gameState);
    newGameState[row][column] = currentPlayer;
    prepareNextTurn(newGameState);
  };

  const agentUpdateGameState = async () => {
    let newGameState;
    if (isMinimMax)
      newGameState = makeMinimaxMove?.(gameState, isPlayerFirst, currentPlayer);
    else {
      newGameState = await fetchMCTSMove(
        gameState,
        gridSize === 4 ? 50000 : 10000,
        currentPlayer
      );
    }

    if (!newGameState)
      throw new Error(
        "minimax agent not initialized or could not fetch new game state"
      );
    else prepareNextTurn(newGameState);
  };

  useEffect(() => {
    // Determines whether it is the agents turn and if so makes the agent's move
    if (!isPlayerTurn && !isGameOver) agentUpdateGameState();
  }, [isPlayerTurn, isGameOver]);

  const renderBoard = useCallback(() => {
    const emptyBoard = [...Array(gridSize)].map((e) => Array(gridSize));
    const board = emptyBoard.map((row, i) => {
      for (let j = 0; j < gridSize; j++)
        row.push(
          <Cell
            key={`${i}${j}`}
            onPress={() => {
              if (!isGameOver && isPlayerTurn) playerUpdateGameState(i, j);
            }}
            identity={gameState[i][j]}
          />
        );
      return (
        <View key={i.toString()} style={styles.row}>
          {row}
        </View>
      );
    });
    return board;
  }, [gridSize, gameState, isPlayerTurn]);

  return (
    <>
      <View style={styles.container}>
        {renderBoard()}
        {(!isPlayerTurn || isGameOver) && (
          <View
            style={[StyleSheet.absoluteFill, styles.activityIndicatorContainer]}
          >
            {!isGameOver && <ActivityIndicator size={50} color="purple" />}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "grey",
  },
  activityIndicatorContainer: {
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.7,
    backgroundColor: "grey",
  },
  row: {
    flexDirection: "row",
  },
});

export default Board;
