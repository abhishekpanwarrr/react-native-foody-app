import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, SHADOWS } from "../constants/theme";

const CategoryItem = ({ category, selected }) => {
  return (
    <View
      style={{
        marginLeft: 12,
        padding: 5,
        alignItems: "center",
        width: 80,
        height: 80,
        justifyContent: "center",
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor:
          category.value === selected ? COLORS.secondary : "transparent",
        shadowColor: SHADOWS.small,
      }}
    >
      <Image
        source={{ uri: category.imageUrl }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
      <Text
        style={{
          fontSize: 13,
          fontFamily: "regular",
        }}
      >
        {category.title}
      </Text>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({});
