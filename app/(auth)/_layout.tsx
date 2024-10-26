import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Layout = () => {
  return (
   <Stack>
    <Stack.Screen name='onBoarding/index' options={{headerShown:false}} />
    <Stack.Screen name='sign-up/index' options={{headerShown:false}} />
    <Stack.Screen name='sign-in/index' options={{headerShown:false}} />
   </Stack>
  )
}

export default Layout