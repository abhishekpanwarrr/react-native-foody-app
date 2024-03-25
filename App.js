import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import BottomTab from "./app/navigation/BottomTab";
import { UserLocationContext } from "./app/context/UserLocationContext";
import { RestaurantContext } from "./app/context/RestaurantContext";
import { CartCountContext } from "./app/context/CartCountContext";
import { UserReversedGeoCode } from "./app/context/UserReversedGeoCode";
import FoodNavigator from "./app/navigation/FoodNavigator";
import RestaurantPage from "./app/navigation/RestaurantPage";
import Restaurant from "./app/screens/restaurant/Restaurant";
import SignUp from "./app/screens/SignUp";
import AddRating from "./app/screens/AddRating";
import { LoginContext } from "./app/context/LoginContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Settings from "./app/screens/user/Settings";
import { StripeProvider } from "@stripe/stripe-react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const [restaurantObj, setRestaurantObj] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [login, setLogin] = useState(false);

  const defaultAddresss = {
    city: "Shanghai",
    country: "China",
    district: "Pudong",
    isoCountryCode: "CN",
    name: "33 East Nanjing Rd",
    postalCode: "94108",
    region: "SH",
    street: "Stockton St",
    streetNumber: "1",
    subregion: "San Francisco County",
    timezone: "America/Los_Angeles",
  };

  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    // (async () => {
    //   try {
    //     await SplashScreen.preventAutoHideAsync();
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== "granted") {
    //       setErrorMsg("Permission denied");
    //       return;
    //     }
    //     const location = await Location.getCurrentPositionAsync({});
    //     if (location) {
    //       setLocation(location);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching location:", error);
    //     setErrorMsg("Error fetching location");
    //   } finally {
    //     SplashScreen.hideAsync();
    //   }
    // })();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }
  const loginStatus = async () => {
    const userToken = await AsyncStorage.getItem("foody_token");
    if (userToken !== null) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };
  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <UserReversedGeoCode.Provider value={{ address, setAddress }}>
        <RestaurantContext.Provider value={{ restaurantObj, setRestaurantObj }}>
          <LoginContext.Provider value={{ login, setLogin }}>
            <CartCountContext.Provider value={{ cartCount, setCartCount }}>
              <StripeProvider publishableKey="">
                <NavigationContainer>
                  <Stack.Navigator>
                    <Stack.Screen
                      name="bottom-navigation"
                      component={BottomTab}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="food-nav"
                      component={FoodNavigator}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="restaurant-page"
                      component={RestaurantPage}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="restaurant"
                      component={Restaurant}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="signup"
                      component={SignUp}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="rating"
                      component={AddRating}
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen
                      name="settings"
                      component={Settings}
                      options={{ headerShown: false, presentation: "modal" }}
                    />
                  </Stack.Navigator>
                </NavigationContainer>
              </StripeProvider>
            </CartCountContext.Provider>
          </LoginContext.Provider>
        </RestaurantContext.Provider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
