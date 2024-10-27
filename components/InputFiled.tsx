import { useState } from "react";
import {
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    Pressable,
  } from "react-native";
  
  import { InputFieldProps } from "types/type";
  
  const InputField = ({
    label,
    icon,
    secureTextEntry = false,
    labelStyle,
    containerStyle,
    inputStyle,
    iconStyle,
    className,
    ...props
  }: InputFieldProps) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
 
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} >
        <Pressable onPress={Keyboard.dismiss}>
          <View className="my-2 w-full">
            <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
              {label}
            </Text>
            <View
            style={{borderColor:isFocused ?"#0286FF":"#f5f5f5"}}
              className={`flex flex-row justify-start items-center  relative bg-neutral-100 rounded-full border-2 border-neutral-100  focus:border-primary-500  ${containerStyle}`}
            >
              {icon && (
                <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
              )}
              <TextInput
         cursorColor={"#999999"}
               onFocus={() => setIsFocused(true)}
               onBlur={() => setIsFocused(false)}
                className={` rounded-full text-black p-4 font-JakartaSemiBold text-[15px] flex-1 focus:outline-none  ${inputStyle} text-left`}
                secureTextEntry={secureTextEntry}
                {...props}
              />
            </View>
          </View>
          </Pressable>
          </KeyboardAvoidingView>

    );
  };
  
  export default InputField;