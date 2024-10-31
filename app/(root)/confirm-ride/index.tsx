import { View, Text, FlatList } from "react-native";
import React from "react";
import RideLayout from "components/RideLayout";
import { drivers } from "constants/index";
import { useDriverStore } from "store";
import DriverCard from "components/DriverCard";
import CustomButton from "components/CustomButton";
import { router } from "expo-router";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriverStore();

  console.log(selectedDriver);
  return (
    <RideLayout title="Choose a Rider" snapPoints={["65%", "85%"]}>
      <FlatList
        data={drivers}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={({ item, index }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id!))}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              disabled={!selectedDriver}
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
