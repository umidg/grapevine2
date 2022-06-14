import React, { memo } from 'react';
import { Image } from 'native-base';
const RoundImage = ({ size, image, ...props }) => {
  return (
    <Image
      // style={{
      //   width: size ? size : 150,
      //   height: size ? size : 100,
      //   borderRadius: size / 2,
      // }}
      // source={image}
      // resizeMethod='resize'
      // resizeMode='contain'
      // {...props}
      borderRadius='full'
      width={size ? size : 150}
      height={size ? size : 100}
      source={image}
      resizeMethod='resize'
      resizeMode='contain'
      {...props}
    />
  );
};

export default memo(RoundImage);
