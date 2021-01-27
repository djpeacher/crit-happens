import React from "react";
import IconButton from "./IconButton";

export function D4({ onPress, color }) {
  return <IconButton name="dice-d4" onPress={() => onPress(4)} color={color} />;
}

export function D6({ onPress, color }) {
  return <IconButton name="dice-d6" onPress={() => onPress(6)} color={color} />;
}

export function D8({ onPress, color }) {
  return <IconButton name="dice-d8" onPress={() => onPress(8)} color={color} />;
}

export function D10({ onPress, color }) {
  return (
    <IconButton name="dice-d10" onPress={() => onPress(10)} color={color} />
  );
}

export function D12({ onPress, color }) {
  return (
    <IconButton name="dice-d12" onPress={() => onPress(12)} color={color} />
  );
}

export function D20({ onPress, color }) {
  return (
    <IconButton name="dice-d20" onPress={() => onPress(20)} color={color} />
  );
}
