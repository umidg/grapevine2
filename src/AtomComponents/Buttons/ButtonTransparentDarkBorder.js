import React from "react";
import { Button, Text } from "native-base";
import { StyleSheet } from "react-native";
const ButtonTransparentDarkBorder = ({ onPress, h, w, children }) => {
  return (
    <Button
      borderColor="buttonDark"
      h={props.h ? props.h : 50}
      w={props.w ? props.w : "100%"}
      borderWidth={3}
      bg="rgba(0,0,0,0)"
      justifyContent="center"
      alignItems={"center"}
      mt="1"
      mb="1"
      onPress={onPress}
    >
      <Text fontSize={"14"} fontWeight="800" color={"#fff"}>
        {children}
      </Text>
    </Button>
  );
};

export default ButtonTransparentDarkBorder;
