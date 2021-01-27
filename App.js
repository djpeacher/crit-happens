import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import Constants from "expo-constants";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { AdMobBanner } from "expo-ads-admob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { activateKeepAwake, deactivateKeepAwake } from "expo-keep-awake";

import IconButton from "./components/IconButton";
import * as Dice from "./components/Dice";

const testID = "ca-app-pub-3940256099942544/2934735716";
const productionId = "ca-app-pub-3688130715004310/6656983474";
const adUnitID = Constants.isDevice && !__DEV__ ? productionId : testID;

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export default function App() {
  const [formula, setFormula] = useState(defaultFormula);
  const [count, setCount] = useState(-1);
  const [mode, setMode] = useState(false);
  const [keepAwake, setkeepAwake] = useState(false);

  useEffect(() => {
    getData("mode").then((value) => {
      setMode(value ? value : false);
    });
  }, []);

  const handleRoll = (dice) => {
    // Update 'count'.
    setCount(count + getRandomInt(dice));

    // Update 'formula'.
    var newFormula = { ...formula };
    newFormula["d" + dice] = newFormula["d" + dice] + 1;
    setFormula(newFormula);

    // Vibrate.
    vibrate();
  };

  const reset = () => {
    setCount(0);
    setFormula(defaultFormula);
  };

  const textColor = { color: mode ? "white" : "black" };
  const iconColor = mode ? "white" : "black";

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: mode ? "black" : "white" }]}
    >
      <StatusBar style={mode ? "light" : "dark"} />

      {/* Menu */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
          marginTop: 5,
        }}
      >
        <IconButton
          name="lightbulb-outline"
          onPress={() => {
            setData("mode", !mode);
            setMode(!mode);
          }}
          color={iconColor}
          size={30}
        />
        <IconButton
          name={keepAwake ? "flash" : "flash-outline"}
          onPress={() => {
            if (!keepAwake) {
              activateKeepAwake();
              Alert.alert("Keep Awake", "Your phone will now stay awake!");
            } else {
              deactivateKeepAwake();
            }
            setkeepAwake(!keepAwake);
          }}
          color={iconColor}
          size={30}
        />
      </View>

      {/* Formula & Count */}
      <TouchableWithoutFeedback onPress={reset}>
        <View style={styles.display}>
          <Text style={[styles.formula, textColor]}>
            {displayFormula(formula)}
          </Text>
          {count == -1 && (
            <>
              <Text style={[styles.ch, textColor]}>Crit{"\n"}Happens</Text>
              <TouchableWithoutFeedback
                onPress={() => Alert.alert("Changelog", changelog)}
              >
                <Text
                  style={{
                    color: "gray",
                    paddingVertical: 10,
                    paddingHorizontal: 50,
                  }}
                >
                  v1.1
                </Text>
              </TouchableWithoutFeedback>
            </>
          )}
          {count >= 0 && <Text style={[styles.count, textColor]}>{count}</Text>}
        </View>
      </TouchableWithoutFeedback>

      {/* Dice */}
      <View style={styles.diceRow}>
        <Dice.D4 onPress={handleRoll} color={iconColor} />
        <Dice.D6 onPress={handleRoll} color={iconColor} />
        <Dice.D8 onPress={handleRoll} color={iconColor} />
      </View>
      <View style={styles.diceRow}>
        <Dice.D10 onPress={handleRoll} color={iconColor} />
        <Dice.D12 onPress={handleRoll} color={iconColor} />
        <Dice.D20 onPress={handleRoll} color={iconColor} />
      </View>

      {/* AD Banner */}
      <View style={styles.ad}>
        <AdMobBanner
          adUnitID={adUnitID}
          testDevices={[AdMobBanner.simulatorId]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  diceRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  ad: {
    paddingTop: 20,
  },
  formula: {
    fontSize: 25,
    textAlign: "center",
  },
  count: {
    fontSize: 150,
    fontWeight: "bold",
  },
  ch: {
    fontSize: 80,
    fontWeight: "bold",
  },
});

const vibrate = () => {
  Haptics.impactAsync("medium");
  setTimeout(() => {
    Haptics.impactAsync("medium");
  }, 100);
  setTimeout(() => {
    Haptics.impactAsync("medium");
  }, 200);
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function displayFormula(f) {
  var result = " ";
  for (let d in f) {
    let value = f[d];
    if (value > 0) {
      if (result != " ") {
        result = result + " + " + value + d;
      } else {
        result = result + value + d;
      }
    }
  }
  return result;
}

let defaultFormula = {
  d4: 0,
  d6: 0,
  d8: 0,
  d10: 0,
  d12: 0,
  d20: 0,
};

let changelog = `[Unreleased]
Dice calculator.
Dice room.

[1.1.0] 2021-01-27
Added dark/light mode.
Added keep awake mode.
Added changelog.

[1.0.0] 2021-01-25
Added dice roller.`;
