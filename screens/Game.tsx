import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../src/styles";
import { COLORS } from "../styles";
import {
  RouteProp,
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";
import { RootStackParamsList } from "../Router";
import { Board, Button } from "../components";
import { hasPlayerWon, GameStateType, isTie } from "../utils";
import { StackActions } from "@react-navigation/native";

const Game: FC = () => {
  const [winner, setWinner] = useState<"X" | "O" | undefined>(undefined);
  const [isGameTied, setIsGameTied] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const route = useRoute<RouteProp<RootStackParamsList, "Game">>();
  const { isPlayerFirst, gridSize } = route.params;

  const onGameStateChange = (gameState: GameStateType, player: "X" | "O") => {
    if (hasPlayerWon(gameState, player)) setWinner(player);
    else if (isTie(gameState)) setIsGameTied(true);
  };

  return (
    <View style={styles.container}>
      <Board
        gridSize={gridSize}
        onGameStateChange={onGameStateChange}
        isGameOver={Boolean(winner) || isGameTied}
        isPlayerFirst={isPlayerFirst}
      />
      <Button
        layoutStyle={styles.button}
        label={"New game"}
        onPress={() => navigation.dispatch(StackActions.popToTop())}
      />
      {Boolean(winner) && <Text fontType="Title">Winner!!!</Text>}
      <Text fontType="Title">{winner}</Text>
      {isGameTied && <Text fontType="Title">Tie</Text>}
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
    marginBottom: 20,
  },
});

export default Game;
