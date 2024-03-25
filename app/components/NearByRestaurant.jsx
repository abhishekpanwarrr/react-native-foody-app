import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import uidata from "../constants/uidata";
import StoreComponent from "./StoreComponent";
import { useNavigation } from "@react-navigation/native";
import { RestaurantContext } from "../context/RestaurantContext";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NearByRestaurant = () => {
  const navigation = useNavigation();
  const { setRestaurantObj } = useContext(RestaurantContext);
  const [loading, setLoading] = useState(false)
  const [restaurants, setRestaurants] = useState(null);

  useEffect(() => {
    (async () => {
      const endpoint = `http://localhost:8000/api/v1/restaurant/`;
      const foody_token = await AsyncStorage.getItem("foody_token");
      try {
        setLoading(true)
        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${foody_token} `,
            "content-type": "application/json"
          }
        });
        if (response.status === 200) {
          setLoading(false)
          return setRestaurants(response?.data?.restaurants);
        } else {
          setRestaurants([])
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
    <View style={{ marginLeft: 12 }}>
      <FlatList
        data={restaurants}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 5,
          rowGap: 10,
        }}
        keyExtractor={(item) => item._id}
        scrollEnabled
        renderItem={({ item }) => (
          <StoreComponent
            item={item}
            onPress={() => {
              navigation.navigate("restaurant", item);
              setRestaurantObj(item);
            }}
          />
        )}
      />
    </View>
  );
};

export default NearByRestaurant;

const styles = StyleSheet.create({});
