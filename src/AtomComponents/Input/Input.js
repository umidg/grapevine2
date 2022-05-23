import { Text, TextInput } from "react-native";
import React from "react";

const Input = ({
  value,
  onChangeText,
  placeholder,
  w,
  h,
  editable = true,
  status = "normal",
}) => {
  return (
    <TextInput
      style={{
        width: w ? w : "100%",
        height: h ? h : 25,
        color: "#fff",
        borderBottomColor: status == "normal" ? "rgba(61,54,130,0.7)" : "red",
        borderBottomWidth: 2,
        fontSize: 12,
        marginBottom: 20,
      }}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
    />
  );
};

export default Input;
