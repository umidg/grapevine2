import React from "react";
import { Button, Text } from "native-base";
const ButtonDark = ({ children, ...props }) => {
  return (
    <Button
      h={props.h ? props.h : "12"}
      w={props.w ? props.w : "100%"}
      justifyContent="center"
      alignItems={"center"}
      mt="1"
      mb="1"
      borderRadius={"full"}
      bg="dark"
      onPress={props.onPress}
      _pressed={{
        bg: "light",
      }}
      _text={{
        fontWeight: "800",
        fontSize: "14",
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonDark;
