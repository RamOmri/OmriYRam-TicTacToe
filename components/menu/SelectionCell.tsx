import React, { FC, useState } from "react";
import { StyleSheet, Pressable } from "react-native";
import { Text } from "../../../../styles";
import { COLORS } from "../../styles";

type SelectionCellProps = {
  label: string;
  isSelected?: boolean;
  onPress?: () => void;
};

const SelectionCell: FC<SelectionCellProps> = ({
  label,
  isSelected = false,
  onPress,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={onPress}
      style={[
        styles.container,
        {
          opacity: isPressed ? 0.5 : 1,
          backgroundColor: isSelected ? COLORS.purple : "white",
        },
      ]}
    >
      <Text fontType="Body" style={{ color: isSelected ? "white" : "black" }}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "25%",
    aspectRatio: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectionCell;
