import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import Constants from "expo-constants";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  SafeAreaView,
} from "react-native";
import * as Haptics from "expo-haptics";
import { AdMobBanner } from "expo-ads-admob";

import IconButton from "./components/IconButton";
import * as Dice from "./components/Dice";

const testID = "ca-app-pub-3940256099942544/2934735716";
const productionId = "ca-app-pub-3688130715004310/6656983474";
const adUnitID = Constants.isDevice && !__DEV__ ? productionId : testID;

export default function App() {
  const [formula, setFormula] = useState(defaultFormula);
  const [count, setCount] = useState(-1);

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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />

      {/* Formula & Count */}
      <TouchableWithoutFeedback onPress={reset}>
        <View style={styles.display}>
          <Text style={styles.formula}>{displayFormula(formula)}</Text>
          {count == -1 && <Text style={styles.ch}>Crit{"\n"}Happens</Text>}
          {count >= 0 && <Text style={styles.count}>{count}</Text>}
        </View>
      </TouchableWithoutFeedback>

      {/* Dice */}
      <View style={styles.diceRow}>
        <Dice.D4 onPress={handleRoll} />
        <Dice.D6 onPress={handleRoll} />
        <Dice.D8 onPress={handleRoll} />
      </View>
      <View style={styles.diceRow}>
        <Dice.D10 onPress={handleRoll} />
        <Dice.D12 onPress={handleRoll} />
        <Dice.D20 onPress={handleRoll} />
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
