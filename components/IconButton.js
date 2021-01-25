import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function IconButton({
  name = "square",
  size = 80,
  color = "black",
  onPress = () => {
    alert("No action given.");
  },
  style,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name={name}
        size={size}
        color={color}
        style={style}
      />
    </TouchableOpacity>
  );
}
