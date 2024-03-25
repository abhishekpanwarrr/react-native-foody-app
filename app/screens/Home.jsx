import { ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import pages from "./page.style";
import HomeHeader from "../components/HomeHeader";
import CategoryList from "../components/CategoryList";
import ChoicesList from "../components/ChoicesList";
import Heading from "../components/Heading";
import NearByRestaurant from "../components/NearByRestaurant";
import Divider from "../components/Divider";
import NewFoodList from "../components/NewFoodList";
import FastestNearYou from "../components/FastestNearYou";
import HomeCategoris from "../components/HomeCategoris";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSelection, setSelectedSelection] = useState(null);
  const [selectedValue, setSelectedValue] = useState(null);
  const [foodList, setFoodList] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      const endpoint = `http://localhost:8000/api/v1/food/category/${selectedValue}`;
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
          return setFoodList(response?.data?.foods);
        }
      } catch (error) {
        setLoading(false)
        console.log("catch error", error);
      }
    })()
  }, [selectedValue])
  return (
    <SafeAreaView>
      <View style={pages.viewOne}>
        <View style={pages.viewTwo}>
          <HomeHeader />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              borderBottomEndRadius: 30,
              borderBottomStartRadius: 30,
            }}
          >
            <CategoryList
              setSelectedCategory={setSelectedCategory}
              setSelectedSelection={setSelectedSelection}
              setSelectedValue={setSelectedValue}
            />
            {/* <ChoicesList
              setSelecteSection={setSelectedSelection}
            /> */}
            {selectedCategory !== null && selectedSelection !== null ? (
              <View>
                <Heading heading={`Browse ${selectedCategory}`} onPress={() => { }} />
                <HomeCategoris loading={loading} foodList={foodList} />
              </View>
            ) : <View>
              <Heading heading={"Nearby restaurants"} onPress={() => { }} />
              <NearByRestaurant />
              <Divider />
              <Heading heading={"Try something new"} onPress={() => { }} />
              <NewFoodList />
              <Divider />
              <Heading heading={"Fastest near you"} onPress={() => { }} />
              <FastestNearYou />
            </View>}

          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
