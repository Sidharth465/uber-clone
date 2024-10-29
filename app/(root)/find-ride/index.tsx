import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "store";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <View className="flex h-full justify-center items-center">
      <Text>you are here {userAddress}</Text>
      <Text>Destination: {destinationAddress}</Text>
    </View>
  );
};

export default FindRide;
