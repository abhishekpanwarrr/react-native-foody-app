import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, SIZES } from "../constants/theme";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Counter from "../components/Counter";

const FoodPage = ({ route, navigation }) => {
  const item = route.params.item;

  const [additives, setAdditives] = useState([]);
  const [totalPrice, setTotalPrice] = useState(1);
  const [count, setCount] = useState(1);
  const [preference, setPreference] = useState("");
  let sendToOrderPage;

  const id = item.restaurant;

  const handleAdditives = (newAdditive) => {
    setAdditives((prev) => {
      const exists = prev.some((additive) => additive.id === newAdditive.id);
      if (exists) {
        return prev.filter((additive) => additive.id !== newAdditive.id);
      } else {
        return [...prev, newAdditive];
      }
    });
  };
  useEffect(() => {
    calculatePrice();
  }, [additives]);

  const calculatePrice = () => {
    const total = additives.reduce((sum, additive) => {
      return sum + parseFloat(additive.price);
    }, 0);
    setTotalPrice(total);
  };

  const handlePress = (item) => {
    const cartItem = {
      productId: item._id,
      additives,
      quantity: count,
      totalPrice: (item.price + totalPrice) * count,
    };
    addToCart(cartItem);
  };

  sendToOrderPage = {
    orderItem: {
      productId: item._id,
      additives,
      quantity: count,
      price: (item.price + totalPrice) * count,
      instruction: preference,
    },
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl[0],
    restaurant: id,
  };

  const addToCart = async (cartItem) => { };

  return (
    <View style={{ backgroundColor: COLORS.lightWhite, height: SIZES.height }}>
      <View>
        <Image
          source={{
            uri: item.imageUrl[0],
          }}
          style={{
            width: SIZES.width,
            height: SIZES.height / 4,
            borderBottomRightRadius: 30,
          }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Ionicons
            name="chevron-back-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }} style={styles.shareBtn}>
          <MaterialCommunityIcons
            name="share-circle"
            size={30}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={{ position: "absolute", bottom: 20, right: 0 }}
        >
          <View style={styles.resetBtn}>
            <Text
              style={{
                color: COLORS.lightWhite,
                fontWeight: "bold",
              }}
            >
              Open the store
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View style={{ flexDirection: "row", gap: 10, }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={[styles.title, { color: COLORS.primary }]}>
            ${(item.price + totalPrice) * count}
          </Text>
        </View>
        <Text style={styles.small}>{item.description}</Text>

        <FlatList
          data={item.foodTags}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item}
          style={{
            marginTop: 10,
          }}
          horizontal
          scrollEnabled
          renderItem={({ item }) => (
            <View style={styles.tags}>
              <Text
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  color: COLORS.lightWhite,
                  textTransform: "capitalize"
                }}
              >
                {item}
              </Text>
            </View>
          )}
        />
        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
          Additives and toppings
        </Text>
        <FlatList
          data={item.additives}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          style={{
            marginTop: 10,
          }}
          horizontal
          scrollEnabled
          renderItem={({ item }) => (
            <View style={styles.additives}>
              <BouncyCheckbox
                size={20}
                unfillColor="#fff"
                fillColor={COLORS.primary}
                innerIconStyle={{ borderWidth: 1 }}
                textStyle={styles.small}
                text={item.title}
                onPress={() => {
                  handleAdditives(item);
                }}
              />
              <Text style={[styles.small, { marginLeft: 10 }]}>- ${item.price}</Text>
            </View>
          )}
        />

        <Text style={[styles.title, { marginBottom: 10, marginTop: 20 }]}>
          Preferences
        </Text>
        <View style={styles.input}>
          <TextInput
            placeholder="Add specific instructions"
            value={preference}
            onChangeText={(text) => setPreference(text)}
            autoCapitalize={"none"}
            autoCorrect={false}
            style={{ flex: 1 }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <Text style={[styles.title, { marginBottom: 10 }]}>Quantity</Text>
          <Counter count={count} setCount={setCount} />
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <View style={styles.suspended}>
          <View style={styles.cart}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 12,
              }}
            >
              <TouchableOpacity onPress={() => { }} style={styles.cartBtn}>
                <AntDesign
                  name="pluscircleo"
                  size={24}
                  color={COLORS.lightWhite}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("order-page", sendToOrderPage)
                }
                style={{
                  backgroundColor: COLORS.primary,
                  paddingHorizontal: 80,
                  borderRadius: 30,
                  justifyContent: "center",
                }}
              >
                <Text style={[styles.title, { color: COLORS.lightWhite }]}>
                  Order
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { }} style={styles.cartBtn}>
                <Text style={[styles.title, { color: COLORS.lightWhite }]}>
                  {count}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodPage;
const styles = StyleSheet.create({
  cartBtn: {
    width: 40,
    height: 40,
    borderRadius: 99,
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    alignItems: "center",
  },
  cart: {
    width: SIZES.width - 24,
    height: 60,
    justifyContent: "center",
    backgroundColor: COLORS.primary1,
    borderRadius: 30,
  },
  suspended: {
    position: "absolute",
    zIndex: 999,
    bottom: 50,
    width: "100%",
    alignItems: "center",
  },
  input: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    backgroundColor: COLORS.offwhite,
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  additives: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 15,
    marginBottom: 10,
  },
  tags: {
    right: 10,
    marginHorizontal: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  small: {
    fontSize: 12,
    fontFamily: "regular",
    color: COLORS.gray,
    textAlign: "justify",
  },
  backBtn: {
    marginLeft: 12,
    alignItems: "center",
    zIndex: 999,
    position: "absolute",
    top: SIZES.xxLarge,
  },
  shareBtn: {
    marginRight: 12,
    alignItems: "center",
    zIndex: 999,
    right: 0,
    position: "absolute",
    top: SIZES.xxLarge,
  },
  resetBtn: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    backgroundColor: COLORS.tertiary
  },
  container: {
    marginHorizontal: 12,
    marginTop: 10,
  },
});
