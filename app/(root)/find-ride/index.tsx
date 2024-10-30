import { View, Text } from "react-native";
import React from "react";
import { useLocationStore } from "store";
import RideLayout from "components/RideLayout";
import { SafeAreaView } from "react-native-safe-area-context";
import GoogleTextInput from "components/GoogleTextInput";
import { icons } from "constants/index";
import CustomButton from "components/CustomButton";
import { router } from "expo-router";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  return (
    <RideLayout snapPoints={["45%", "80%"]} title="Ride">
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          icon={icons.target}
          initialLocation={userAddress!}
          containerStyle={"bg-neutral-100"}
          textInputBackgroundColor="#f5f5f5f5"
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          icon={icons.map}
          initialLocation={destinationAddress!}
          containerStyle={"bg-neutral-100"}
          textInputBackgroundColor="#f5f5f5f5"
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        className="mt-5"
        title="Find Now"
        onPress={() => router.push("/(root)/confirm-ride")}
      />
    </RideLayout>
  );
};

export default FindRide;
