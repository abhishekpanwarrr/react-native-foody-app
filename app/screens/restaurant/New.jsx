import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import uidata from '../../constants/uidata';
import CategoryFoodComp from '../../components/CategoryFoodComp';

const New = () => {
  const navigation = useNavigation();
  return (
    <View style={{ marginTop: 5 }}>
      <FlatList
        data={uidata.foods}
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 5 }}
        keyExtractor={(item) => item._id}
        // numColumns={2}
        scrollEnabled
        renderItem={({ item }) => (
          <CategoryFoodComp item={item} onPress={() => navigation.navigate("food-nav", item)} />
        )}
      />
    </View>
  )
}

export default New

const styles = StyleSheet.create({})