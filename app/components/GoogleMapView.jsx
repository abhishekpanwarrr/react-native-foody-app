import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserLocationContext } from "../context/UserLocationContext";
import { COLORS, SIZES } from "../constants/theme";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import PlaceMarket from "./PlaceMarket";

const GoogleMapView = ({ placeList }) => {
  const { location } = useContext(UserLocationContext);
  const [directions, setDirections] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [mapRegion, setMapRegion] = useState({
    latitude: 35.6855,
    longitude: 139.68884,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0421,
  });
  const apiKey = "AIzaSyAfv-CKDIqzt2uu_Dtl6liXVAefWlnXg2E";

  // useEffect(() => {
  //   if (location) {
  //     setMapRegion({
  //       latitude: location.coords.latitude,
  //       longitude: location.coords.longitude,
  //       latitudeDelta: 0.03,
  //       longitudeDelta: 0.01,
  //     });
  //     fetchDirections(
  //       placeList[0]?.latitude,
  //       placeList[0]?.longitude,
  //       location?.coords?.latitude,
  //       location?.coords?.longitude
  //     );
  //   }
  // }, [location]);

  const fetchDirections = async (
    startLat,
    startLng,
    destinationLat,
    destinationLng
  ) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${startLat},${startLng}&destination=${destinationLat},${destinationLng}&key=${apiKey}`;
      const response = await fetch(url);
      const data = await response.json().then((data) => {
        setDirections(data);
        const encodedPolyline = data.routes[0].overview_polyline.points;
        const coordinates = decode(encodedPolyline);

        setCoordinates(coordinates);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const decode = (encoded) => {
    const points = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let shift = 0,
        result = 0;
      let byte;
      do {
        byte = encoded.charCodeAt(index++) - 63; // <-- we use charCodeAt method, not a 'char' property
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += deltaLat;

      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);
      const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += deltaLng;

      points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return points;
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        region={mapRegion}
      />
      <Marker title="My Location" coordinate={mapRegion} />
      {placeList.map(
        (item, index) => index <= 1 && <PlaceMarket key={index} coordinates={item} />
      )}

      <Polyline coordinates={coordinates} strokeColor={COLORS.primary} strokeWidth={5} />
    </View>
  );
};

export default GoogleMapView;

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  mapContainer: {
    height: SIZES.height / 2.6,
    width: SIZES.width,
    borderColor: COLORS.gray2,
    borderWidth: 1,
  },
});
