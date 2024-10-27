import { View, Text } from 'react-native'
import React from 'react'
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
const Home = () => {
  const { user } = useUser()
  return (
    <SafeAreaView>
    <SignedIn>
      <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
    </SignedIn>
    
  </SafeAreaView>
  )
}

export default Home