import React from "react";
import { Button, Text } from "native-base";
const ButtonDark = (props) => {
  return (
    <Button
      h={props.h ? props.h : 50}
      w={props.w ? props.w : "100%"}
      justifyContent="center"
      alignItems={"center"}
      mt="1"
      mb="1"
      borderRadius={"full"}
      bg={props.bg ? props.bg : "buttonDark"}
      onPress={props.onPress}
      variant="solid"
      _pressed={{
        bg: "buttonDarkClick",
      }}
    >
      <Text
        fontSize={"14"}
        fontWeight="800"
        color={props.bg ? "#000" : "#fff"}
        italic
      >
        {props.children}
      </Text>
    </Button>
  );
};

export default ButtonDark;
