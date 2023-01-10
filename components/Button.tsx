import React, { FC } from "react";
import { TouchableOpacity, StyleSheet, FlexStyle } from "react-native";
import { Text } from "../../../src/styles";
import { COLORS } from "../styles";

type Props = {
  onPress?: () => void;
  label: string;
  layoutStyle?: FlexStyle;
};

const Button: FC<Props> = ({ onPress, label, layoutStyle }) => {
  return (
    <TouchableOpacity style={[styles.container, layoutStyle]} onPress={onPress}>
      <Text fontType="Body">{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: COLORS.darkPurple,
    borderRadius: 10,
  },
});

export default Button;
