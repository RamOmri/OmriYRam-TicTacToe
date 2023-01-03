import React, { FC, useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import Cell from "./Cell";
import { createInitialGameState, GameStateType } from "../utils";

type Props = {
  gridSize: 3 | 4 | 5;
  onGameStateChange?: (gameState: GameStateType, Player: "X" | "O") => void;
  isGameOver?: boolean;
};

const Board: FC<Props> = ({
  gridSize,
  onGameStateChange,
  isGameOver = false,
}) => {
  const [gameState, setGameState] = useState(createInitialGameState(gridSize));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  const updateGameState = (row: number, column: number) => {
    gameState[row][column] = currentPlayer;
    setGameState(gameState);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    onGameStateChange?.(gameState, currentPlayer);
  };

  const renderBoard = useCallback(() => {
    const emptyBoard = [...Array(gridSize)].map((e) => Array(gridSize));
    const board = emptyBoard.map((row, i) => {
      for (let j = 0; j < gridSize; j++)
        row.push(
          <Cell
            key={`${i}${j}`}
            onPress={() => (isGameOver ? undefined : updateGameState(i, j))}
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
  }, [gridSize, gameState, currentPlayer]);

  return <View style={styles.container}>{renderBoard()}</View>;
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "grey",
  },
  row: {
    flexDirection: "row",
  },
});

export default Board;
