import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "constants";
import CustomButton from "components/CustomButton";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, SetActiveIndex] = useState(0);

  const isLastIndex = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="mx-1 flex h-full items-center justify-between   bg-white">
      <TouchableOpacity
        className="w-full flex justify-end items-end p-5 "
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
      >
        <Text className="text-black text-md font-JakartaBold ">Skip</Text>
      </TouchableOpacity>

      <Swiper
        onIndexChanged={(index) => SetActiveIndex(index)}
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
      >
        {onboarding?.map((item) => (
          <View key={item?.id} className="flex items-center justify-center">
            <Image
              className="w-full h-[300px] "
              resizeMode="contain"
              source={item?.image}
            />
            <View className="flex flex-row items-center justify-center  w-full mt-10">
              <Text className="text-black text-center text-3xl font-bold mx-10">
                {item?.title}
              </Text>
            </View>
            <Text className="text-lg font-JakartaSemiBold text-center mx-10 text-black opacity-60 ">
              {item?.description}
            </Text>
          </View>
        ))}
      </Swiper>
    
     <CustomButton
        onPress={
          isLastIndex
            ? () => router.replace("/(auth)/sign-up")
            : () => swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10 mb-5 "
        title={isLastIndex ? "Get Started" : "Next"}
      />
     
    </SafeAreaView>
  );
};

export default OnBoarding;
