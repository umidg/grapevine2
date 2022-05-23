import React from "react";
import { Center, Image, View } from "native-base";
const ColorWrapper = ({ children }) => {
  return (
    <Center
      borderRadius="15"
      bg="blue.900"
      p="1"
      style={{
        backgroundColor:
          "linear-gradient(90deg, #5162f1 0%, rgba(121, 73, 231,1) 100%)",
      }}
    >
      {children}
    </Center>
  );
};

export default ColorWrapper;
