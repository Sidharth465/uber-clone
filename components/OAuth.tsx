import { View, Text, Image, Linking, Alert } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "constants/index";
import { useAuth, useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { googleOAuth } from "constants/lib/auth";

type Props = {
  processing: boolean;
  setProcessing: (value: boolean) => void;
};

const OAuth = ({ processing = false, setProcessing }: Props) => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const { isSignedIn } = useAuth();

  const handleGoogleSignIn = React.useCallback(async () => {
    try {
      // setProcessing(true);
      const result = await googleOAuth(startOAuthFlow);
      console.log("Result and isSigned in", result, isSignedIn);

      console.log("Result.code", result?.code);

      if (!result.success) {
        router.replace("/");
      } else {
        Alert.alert("Success", "Session exists. Redirecting to home screen.");
        router.replace("/(root)/(tabs)/home");
      }

      Alert.alert(result.success ? "Success" : "Error", result.message);
    } catch (err) {
      console.error("OAuth error", err);
    } finally {
      // setProcessing(false);
    }
  }, []);
  return (
    <View>
      <View className="flex flex-row justify-center items-center mt-4">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>

      <CustomButton
        processing={processing}
        title="Log In with Google"
        className="mt-5 w-full shadow-none"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-5 h-5 mx-2"
            resizeMode="contain"
          />
        )}
        bgVariant="outline"
        textVariant="primary"
        onPress={handleGoogleSignIn}
      />
    </View>
  );
};

export default OAuth;
