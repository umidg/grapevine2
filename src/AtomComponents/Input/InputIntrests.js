import React from "react";
import { View, Text, Input } from "native-base";
import { TextInput } from "react-native";
const InputIntrests = ({ value, onChangeText, placeholder, w, h }) => {
  return (
    <Input
      w="60%"
      bg="rgba(255,255,255,0.18823529411764706)"
      borderRadius="10"
      style={{ width: w ? w : "100%", height: h ? h : 50 }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      color="#fff"
    />
  );
};

export default InputIntrests;
