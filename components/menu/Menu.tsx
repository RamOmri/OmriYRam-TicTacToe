import React, { FC, useState } from "react";
import { View, StyleSheet } from "react-native";
import SelectionCell from "./SelectionCell";

type MenuProps = {
  options: string[];
  onSelectionChanged?: (selectedIndex: number) => void;
};

const Menu: FC<MenuProps> = ({ options, onSelectionChanged }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const onPress = (index: number) => {
    onSelectionChanged?.(index);
    setSelectedIndex(index);
  };

  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        return (
          <SelectionCell
            isSelected={index === selectedIndex}
            label={option}
            onPress={() => onPress(index)}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
});

export default Menu;
