import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import uidata from "../constants/uidata";
import CategoryItem from "./CategoryItem";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CategoryList = ({
  setSelectedCategory,
  setSelectedSelection,
  setSelectedValue,
}) => {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState(null)

  const handleSelectedCategory = (item) => {
    if (selected === item.value) {
      setSelectedCategory(null);
      setSelected(null);
      setSelectedSelection(null);
      setSelectedValue(null);
    } else {
      setSelectedCategory(item.title);
      setSelected(item.value);
      setSelectedSelection("category");
      setSelectedValue(item.value);
    }
  };
  useEffect(() => {
    (async () => {
      const endpoint = "http://localhost:8000/api/v1/category";
      const foody_token = await AsyncStorage.getItem("foody_token");
      try {
        setLoading(true)
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${foody_token}`,
            "content-type": "application/json"
          }
        });
        if (response.status === 200) {
          setLoading(false)
          return setCategories(response?.data?.categories);
        }
      } catch (error) {
        setLoading(false)
        console.log("catch error", error);
      }
    })()
  }, [])
  if (loading) {
    return <View>
      <ActivityIndicator size={"large"} />
    </View>
  }
  return (
    <FlatList
      data={categories}
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ marginTop: 5 }}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelectedCategory(item)}>
          <CategoryItem category={item} selected={selected} />
        </TouchableOpacity>
      )}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({});
