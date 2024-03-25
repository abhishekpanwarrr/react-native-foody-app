import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import uidata from '../constants/uidata'
import FoodComponent from './FoodComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FastestNearYou = () => {
  const renderItem = ({ item }) => (
    <FoodComponent item={item} onPress={() => { }} />
  );
  const [loading, setLoading] = useState(false)
  const [foodList, setFoodList] = useState(null)
  useEffect(() => {
    (async () => {
      const endpoint = `http://localhost:8000/api/v1/food/`;
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
          return setFoodList(response?.data?.foods);
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
    <View style={{ marginLeft: 12, marginBottom: 10 }}>
      <FlatList
        data={foodList}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 5,
          rowGap: 10,
        }}
        keyExtractor={(item) => item._id}
        scrollEnabled
        renderItem={renderItem}
      />
    </View>
  )
}

export default FastestNearYou

const styles = StyleSheet.create({})