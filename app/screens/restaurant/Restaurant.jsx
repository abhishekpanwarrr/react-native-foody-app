import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import RestaurantPage from "../../navigation/RestaurantPage";
import NetworkImage from "../../components/NetworkImage";
import { COLORS, SIZES } from "../../constants/theme";
import { useRoute } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { RatingInput } from "react-native-stock-star-rating";
import GoogleApiServices from "../../hook/GoogleApiServices";
import { UserLocationContext } from "../../context/UserLocationContext";

const Restaurant = ({ navigation }) => {
  const route = useRoute();
  const item = route.params;
  const { location } = useContext(UserLocationContext);
  const [distanceTime, setDistanceTime] = useState({});

  // useEffect(() => {
  //   GoogleApiServices.calculateDistanceAndTime(
  //     item.coords.latitude,
  //     item.coords.longitude,
  //     location.coords.latitude,
  //     location.coords.latitude
  //   ).then((result) => {
  //     if (result) {
  //       setDistanceTime(result);
  //     }
  //   });
  //   console.log("distanceTime", distanceTime);
  // }, []);

  const totalTime =
    GoogleApiServices.extractNumbers(distanceTime.duration)[0] +
    GoogleApiServices.extractNumbers(item?.time)[0];

  return (
    <View>
      <View>
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
        <NetworkImage
          source={item?.imageUrl}
          height={SIZES.height / 3.4}
          width={SIZES.width}
        />
        <View style={styles.rating}>
          <View style={styles.innaRating}>
            <RatingInput
              rating={Number(item.rating)}
              size={20}
            // color={COLORS.lightWhite}
            />
            <TouchableOpacity
              style={styles.ratingBtn}
              onPress={() => navigation.navigate("rating")}
            >
              <Text style={styles.btnText}>Rate the restaurant</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{ marginTop: 8, marginHorizontal: 8, marginBottom: 10 }}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.small, { color: COLORS.gray }]}>Distance</Text>
          <Text style={[styles.small, { fontFamily: "regular" }]}>
            {distanceTime?.distance ?? 0}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.small, { color: COLORS.gray }]}>
            Prep and Delivery Time
          </Text>
          <Text style={[styles.small, { fontFamily: "regular" }]}>
            {totalTime ? `${totalTime} min` : "-"}
          </Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={[styles.small, { color: COLORS.gray }]}>Cost</Text>
          <Text style={[styles.small, { fontFamily: "regular" }]}>
            {distanceTime?.finalPrice ?? 0}
          </Text>
        </View>
      </View>

      <View
        style={{
          height: SIZES.height / 1.5,
        }}
      >
        <RestaurantPage />
      </View>
    </View>
  );
};

export default Restaurant;

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontFamily: "medium",
    color: COLORS.black,
  },
  small: {
    fontSize: 13,
    fontFamily: "medium",
    color: COLORS.black,
  },
  btnText: {
    fontSize: 14,
    fontFamily: "medium",
    color: COLORS.white,
  },
  ratingBtn: {
    padding: 6,
    borderColor: COLORS.lightWhite,
    borderWidth: 1,
    borderRadius: 9,
  },
  innaRating: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 12,
  },
  rating: {
    height: 50,
    justifyContent: "center",
    width: "100%",
    position: "absolute",
    backgroundColor: "#00fff53c",
    zIndex: 999,
    borderRadius: 18,
    bottom: 0,
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
});
