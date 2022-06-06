import React from "react";
import { Box, Button, Text } from "native-base";

const ButtonLight = (props) => {
  return (
    <Button
      h={props.h ? props.h : 50}
      w={props.w ? props.w : "100%"}
      justifyContent="center"
      alignItems={"center"}
      mt="1"
      mb="1"
      borderRadius={"full"}
      bg="light"
      onPress={props.onPress}
      _pressed={{
        bg: "buttonDark",
      }}
      {...props}
    >
      <Box
        _text={{
          fontSize: "14",
          fontWeight: "800",
          color: "#fff",
          fontStyle: "italic",
        }}
      >
        {props.children}
      </Box>
    </Button>
  );
};

export default ButtonLight;
