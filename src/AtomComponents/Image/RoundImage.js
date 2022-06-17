import React, { memo } from 'react';
import { Image, Box, Avatar } from 'native-base';
const RoundImage = ({ size, image, ...props }) => {
  return (
    <Box>
      <Box borderWidth='2' borderColor='primary' p='0.5' borderRadius='full'>
        <Image
          alt='image'
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
      </Box>
    </Box>
  );
};

export default memo(RoundImage);
