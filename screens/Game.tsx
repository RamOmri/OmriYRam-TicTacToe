import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../src/styles";
import { COLORS } from "../styles";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamsList } from "../Router";
import { Board, Button } from "../components";
import { hasPlayerWon } from "../utils";

const Game: FC = () => {
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<"X" | "O" | undefined>(undefined);
  const route = useRoute<RouteProp<RootStackParamsList, "Game">>();
  const navigation = useNavigation();
  const { isPlayerFirst, gridSize } = route.params;

  return (
    <View style={styles.container}>
      <Text fontType="BodyHeader" style={styles.title}>
        Game
      </Text>
      <Board
        gridSize={gridSize}
        onGameStateChange={(gameState, Player) =>
          hasPlayerWon(gameState, Player) ? setWinner(Player) : undefined
        }
        isGameOver={Boolean(winner)}
      />
      <Button
        layoutStyle={styles.button}
        label={"New game"}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 20,
    paddingTop: 60,
  },
  text: {
    marginBottom: 10,
  },
  title: {
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default Game;
