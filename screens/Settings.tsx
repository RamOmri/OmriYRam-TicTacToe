import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "../../../src/styles";
import { COLORS } from "../styles";
import { Menu, Button } from "../components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamsList } from "../Router";
import { MinimaxTreeGraphContext } from "../MinimaxContextProvider";
import { ActivityIndicator } from "react-native-web";

export default function Settings() {
  type gridSizeOptions = 3 | 4 | 5;
  const [gridSize, setGridSize] = useState<gridSizeOptions>(3);
  const [isPlayerFirst, setIsPlayerFirst] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParamsList>>();
  const [currentNode] = useContext(MinimaxTreeGraphContext);
  const [hasPressedStartGame, setHasPressedStartGame] = useState(false);

  const onSelectionFirstOrSecond = (index: number) => {
    setIsPlayerFirst(index === 0);
  };

  const onSelectionGridSize = (index: 0 | 1 | 2) => {
    const size = (3 + index) as gridSizeOptions;
    setGridSize(size);
  };

  useEffect(() => {
    const isLoadingTreeGraph =
      !currentNode && hasPressedStartGame && gridSize === 3;
    if (hasPressedStartGame && (!isLoadingTreeGraph || gridSize != 3)) {
      navigation.navigate("Game", {
        gridSize,
        isPlayerFirst,
      });
      setHasPressedStartGame(false);
    }
  }, [currentNode, hasPressedStartGame]);

  if (!currentNode && hasPressedStartGame && gridSize === 3)
    return (
      <View style={[styles.container, styles.activityContainer]}>
        <ActivityIndicator size={50} color="purple" />
        <Text fontType="BodyHeader" style={styles.activityText}>
          Fetching the minimax tree graph! This might take a few seconds....
        </Text>
      </View>
    );

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
        onSelectionChanged={(index) => onSelectionGridSize(index as 0 | 1 | 2)}
        options={["3X3", "4X4", "5X5"]}
      />
      <Button label="Start Game" onPress={() => setHasPressedStartGame(true)} />
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
  activityText: {
    textAlign: "center",
    marginTop: 16,
  },
  activityContainer: {
    justifyContent: "center",
  },
});
