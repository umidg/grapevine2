import React from "react";
import { Box, Input } from "native-base";

const InputText = ({ h, w, placeholder, value, onChangeText }) => {
  return (
    <Box
      bg="buttonDark"
      borderRadius={"md"}
      flexDirection="row"
      // justifyContent={"center"}
      alignItems="center"
      m="5"
      h={h ? h : 53}
      w={w ? w : "100%"}
    >
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        borderWidth="0"
        w="100%"
        color="#f5f4ff"
        fontWeight={"800"}
        fontSize={12}
      />
    </Box>
  );
};

export default InputText;
