export const reverseGeoCode = async (latitude, longitude) => {
  const reverseGeoCodeAddress = await Location.reverseGeocodeAsync({
    longitude,
    latitude,
  });
  setAddress(reverseGeoCodeAddress[0]);
  const greeting = getTimeofDay();
  return greeting
};

const getTimeofDay = () => {
  const now = new Date();
  const hour = now.getHours();
  if (hour >= 0 && hour < 12) {
    return "🌞";
  } else if (hour > 12 < 17) {
    return "🌤️";
  } else {
    return "🌚";
  }
};
