import React from 'react';
import { Center, Image, View } from 'native-base';
const ColorWrapper = ({ children }) => {
  return (
    <Center
      borderRadius='full'
      p='2'
      style={{
        backgroundColor:
          'linear-gradient(90deg, #5162f1 0%, rgba(121, 73, 231,1) 100%)',
      }}
      w='full'
    >
      {children}
    </Center>
  );
};

export default ColorWrapper;
