import React from "react";
import IconButton from "./IconButton";

export function D4({ onPress }) {
  return <IconButton name="dice-d4" onPress={() => onPress(4)} />;
}

export function D6({ onPress }) {
  return <IconButton name="dice-d6" onPress={() => onPress(6)} />;
}

export function D8({ onPress }) {
  return <IconButton name="dice-d8" onPress={() => onPress(8)} />;
}

export function D10({ onPress }) {
  return <IconButton name="dice-d10" onPress={() => onPress(10)} />;
}

export function D12({ onPress }) {
  return <IconButton name="dice-d12" onPress={() => onPress(12)} />;
}

export function D20({ onPress }) {
  return <IconButton name="dice-d20" onPress={() => onPress(20)} />;
}
