import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

const Counter = ({ count, setCount }) => {
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    count > 1 && setCount(count - 1);
  };
  return (
    <View style={{ flexDirection: "row", justifyContent: "flex-start",gap:5 }}>
      <AntDesign
        name="minuscircleo"
        size={26}
        color={COLORS.primary}
        onPress={decrement}
      />
      <Text style={{ fontFamily: "regular", fontSize: 18, marginTop: 1 }}>
        {count}
      </Text>
      <AntDesign
        name="pluscircleo"
        size={26}
        color={COLORS.primary}
        onPress={increment}
      />
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({});
