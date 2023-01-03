import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../src/styles";
import { COLORS } from "../styles";
import { Menu, Button } from "../components";
import {
  NavigationContainerProps,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { RootStackParamsList } from "../Router";

export default function Settings() {
  type gridSizeOptions = 3 | 4 | 5;
  const [gridSize, setGridSize] = useState<gridSizeOptions>(3);
  const [isPlayerFirst, setIsPlayerFirst] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();

  const onSelectionFirstOrSecond = (index: number) => {
    if (index === 0) {
      setIsPlayerFirst(true);
    } else if (index === 1) {
      setIsPlayerFirst(false);
    }
  };

  const onSelectionGridSize = (index: number) => {
    if (index === 0) setGridSize(3);
    else if (index === 1) setGridSize(4);
    else if (index === 2) setGridSize(5);
  };

  return (
    <View style={styles.container}>
      <Text fontType="BodyHeader" style={styles.title}>
        Minimax Tic Tac Toe
      </Text>
      <Text fontType="Body" style={styles.text}>
        Are you playing first or second?
      </Text>
      <Menu
        onSelectionChanged={onSelectionFirstOrSecond}
        options={["First", "Second"]}
      />
      <Text fontType="Body" style={styles.text}>
        Select the grid size of the board
      </Text>
      <Menu
        onSelectionChanged={onSelectionGridSize}
        options={["3X3", "4X4", "5X5"]}
      />
      <Button
        label="Start Game"
        onPress={() => navigation.navigate("Game", { gridSize, isPlayerFirst })}
      />
    </View>
  );
}

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
});
