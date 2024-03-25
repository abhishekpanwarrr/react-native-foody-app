import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import CategoryFoodComp from './CategoryFoodComp'
import { useNavigation } from '@react-navigation/native'
import LottieView from "lottie-react-native";
import { SIZES } from '../constants/theme';

const HomeCategoris = ({ loading, foodList }) => {
    const navigation = useNavigation()
    const animation = useRef(null);
    const renderCartItem = ({ item }) => {
        return <CategoryFoodComp item={item} onPress={() => { }} />
    }
    if (loading) {
        return <View>
            <ActivityIndicator size={"large"} />
        </View>
    }
    if (foodList.length <= 0) {
        return <View style={{ alignItems: "center" }}>
            <LottieView
                autoPlay
                ref={animation}
                style={{ width: "100%", height: SIZES.height / 3.2 }}
                source={require("../../assets/anime/cook.json")}
            />
            <Text style={{ alignSelf: "center", fontSize: 18 }}>No items found</Text>
        </View>
    }
    return (
        <View style={{ marginLeft: 12, marginBottom: 12 }}>
            <FlatList
                data={foodList}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item._id}
                style={{ marginTop: 10 }}
                scrollEnabled={false}
                renderItem={renderCartItem}
            />
        </View>
    )
}

export default HomeCategoris

const styles = StyleSheet.create({})