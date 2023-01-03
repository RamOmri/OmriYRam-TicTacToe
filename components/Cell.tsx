import React, { FC, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { COLORS } from "../styles";

type Props = {
  identity?: "X" | "O";
  onPress?: () => void;
};

const Cell: FC<Props> = ({ identity, onPress }) => {
  switch (identity) {
    case "X":
      return (
        <Image style={styles.container} source={require("../assets/X.jpeg")} />
      );
    case "O":
      return (
        <Image style={styles.container} source={require("../assets/O.jpeg")} />
      );
    default:
      return <TouchableOpacity onPress={onPress} style={styles.container} />;
  }
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    flex: 1,
    aspectRatio: 1,
    borderColor: COLORS.purple,
    backgroundColor: "white",
  },
});

export default Cell;
