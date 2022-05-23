import React, { memo } from "react";
import { Image } from "react-native";
const RoundImage = ({ size, image }) => {
  return (
    <Image
      style={{
        width: size ? size : 150,
        height: size ? size : 100,
        borderRadius: size / 2,
      }}
      source={image}
      resizeMethod="resize"
      resizeMode="contain"
    />
  );
};

export default memo(RoundImage);
