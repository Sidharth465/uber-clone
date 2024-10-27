import { View, Text, ScrollView, Image } from "react-native";
import React, { useState, version } from "react";
import { icons, images } from "constants";
import InputFiled from "components/InputFiled";
import CustomButton from "components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "components/OAuth";
import { useSignIn } from "@clerk/clerk-expo";


const SignIn = () => {
  const [form, setForm] = useState({email: "", password: "" });
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password:form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace("/index")
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, form.email, form.password])
  return (
    <ScrollView className="flex-1 bg-white  ">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
           Welcome 👋
          </Text>
        </View>
        <View className="p-5">
         
          <InputFiled
            label={"Email"}
            icon={icons.email}
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(value: string) => setForm({ ...form, email: value })}
          />
          <InputFiled
            label={"Password"}
            icon={icons.lock}
            placeholder="Enter your Password"
            value={form.password}
            onChangeText={(value: string) => setForm({ ...form, password: value })}
          />
          <CustomButton className="mt-6" title="Sign In" onPress={onSignInPress}/>


          {/* oauth custom button */}
          <OAuth />

          <Link href={"/(auth)/sign-up"} className="text-lg text-center text-general-200 mt-10">
          <Text>Don't have an account? </Text>
          <Text className="text-primary-500 font-JakartaBold">Sign Up</Text>
          </Link>
        </View>

        {/* verification modal */}
  

      </View>
    </ScrollView>
  );
};

export default SignIn;
