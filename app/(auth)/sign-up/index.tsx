import { View, Text, ScrollView, Image, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "constants";
import InputFiled from "components/InputFiled";
import CustomButton from "components/CustomButton";
import { Link, useRouter } from "expo-router";
import OAuth from "components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "constants/lib/fetch";


type LoadingState = 'signup'|'verify'|null;




const SignUp = () => {
  const [isLoading,setLoading] = useState<LoadingState>(null);
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [verification, setVerification] = React.useState({
    state: "default",
    error: "",
    code: "",
  });

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      setLoading("signup")
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }finally{
      setLoading(null)
    }
  };
  const onPressVerify = async () => {
    if (!isLoaded) return;
    try {
      setLoading("verify")
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          error: "Verification failed. Please try again.",
          state: "failed",
        });
      }
    } catch (err: any) {
     
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
    }finally{
      setLoading(null)
    }
  };
  return (
    <ScrollView className="flex-1 bg-white  ">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputFiled
          
            label={"Name"}
            icon={icons.person}
            placeholder="Enter your name"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputFiled
            label={"Email"}
            icon={icons.email}
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(value: string) => setForm({ ...form, email: value })}
          />
          <InputFiled
          secureTextEntry = {true}
            label={"Password"}
            icon={icons.lock}
            placeholder="Enter your Password"
            value={form.password}
            onChangeText={(value: string) =>
              setForm({ ...form, password: value })
            }
            
          />
          <CustomButton
            className="mt-6"
            title="Sign Up"
            onPress={onSignUpPress}
            processing={isLoading === "signup"}
          />

          {/* oauth custom button */}
          <OAuth />

          <Link
            href={"/(auth)/sign-in"}
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>Already have an account? </Text>
            <Text className="text-primary-500 font-JakartaBold">Log In</Text>
          </Link>
        </View>
        {/* modal */}
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaSemiBold mb-2">
              Verification
            </Text>
            <Text>We've send a verification code to {form.email}</Text>
            <InputFiled
              labelStyle=" font-JakartaBold"
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification?.error && <Text className="text-red-500 text-sm mt-1"> {verification.error}</Text>}
            <CustomButton
              title="Verify Email"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
              processing ={isLoading === "verify"}
            />
          </View>
        </ReactNativeModal>

        {/* verification modal */}
        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              resizeMode="contain"
              source={images.check}
              className="w-[85px] h-[85px] mx-auto my-5"
            />
            <Text
              className="text-3xl text-black font-JakartaBold text-center
      "
            >
              Verified
            </Text>
            <Text className="text-base text-gray-400 text-center mt-2">
              You have successfully verified your account
            </Text>

            <CustomButton
              className="mt-5"
              title="Browse Home"
              onPress={() => router.replace("/(root)/(tabs)/home")}
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
