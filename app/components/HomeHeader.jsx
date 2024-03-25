import React, { useContext, useEffect, useState } from "react";
import { UserReversedGeoCode } from "../context/UserReversedGeoCode";
import { UserLocationContext } from "../context/UserLocationContext";
import { StyleSheet, Text, View } from "react-native";
import AssetImage from "./AssetImage";
import { COLORS, SIZES } from "../constants/theme";
import * as Location from "expo-location";
import { reverseGeoCode } from "../utils/utils";

const HomeHeader = () => {
  const [time, setTime] = useState(null);
  const { address } = useContext(UserReversedGeoCode);
  const { location } = useContext(UserLocationContext);
  useEffect(() => {
    if (location !== null) {
      const greeting = reverseGeoCode(location?.coords?.latitude, location?.coords?.longitude);
      setTime(greeting);
    }
  }, [location]);


  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={styles.outerStyle}>
        <AssetImage
          data={require("../../assets/images/profile.jpg")}
          width={50}
          height={50}
          radius={99}
          mode={"cover"}
        />
        {address?.city || address?.name && <View style={styles.headerStyle}>
          <Text style={styles.heading}>Delivering to</Text>
          <Text
            style={styles.location}
          >{`${address?.city ?? ""} ${address?.name ?? ""}`}</Text>
        </View>
        }
      </View>
      <Text style={{ fontSize: 36 }}>{time}</Text>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  outerStyle: {
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  headerStyle: {
    marginLeft: 15,
    justifyContent: "center",
  },
  heading: {
    fontFamily: "medium",
    fontSize: SIZES.medium,
    color: COLORS.secondary,
  },
  location: {
    fontFamily: "regular",
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
  },
});
