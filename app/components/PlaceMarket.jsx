import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Marker } from "react-native-maps";

const PlaceMarket = ({ coordinates }) => {
  return (
    <Marker
      title={coordinates.title}
      coordinate={{
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.01,
      }}
    />
  );
};

export default PlaceMarket;

const styles = StyleSheet.create({});
