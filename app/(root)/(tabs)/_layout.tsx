import { icons } from "constants";
import { Tabs } from "expo-router";
import React from "react";

import { Image, ImageSourcePropType, Platform, View } from "react-native";



const TabIcon =({source,focused}:{
    source: ImageSourcePropType,
    focused:boolean
})=>{
    return(
      <View
      className={`flex flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
    >
      <View
        className={` rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
      >
        <Image
          source={source}
          tintColor="white"
          resizeMode="contain"
          className="w-7 h-7"
        />
      </View>
    </View>
    )

}



export default function Layout(){
    return (
        <Tabs  initialRouteName="index"
        screenOptions={{tabBarActiveTintColor:"white",tabBarInactiveTintColor:"white",tabBarShowLabel:false,tabBarStyle:{
          backgroundColor:"#333333",
          borderRadius:50,
          overflow:"hidden",
          marginHorizontal:20,
          marginBottom:20
          ,
          height:75,
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          position:"absolute"
        }}}>
             <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides/index"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat/index"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
        </Tabs>
    )
}