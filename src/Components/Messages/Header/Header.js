import React from 'react';
import { Flex, Text, Image } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const Header = ({ goBack }) => {
  return (
    <Flex
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      pr='5'
      pl='5'
    >
      <TouchableOpacity onPress={goBack}>
        <AntDesign name='arrowleft' size={30} color='black' />
      </TouchableOpacity>

      <Text fontSize={14} fontWeight='800'>
        Messages
      </Text>
      <Image
        alt='image'
        source={require('../../../../assets/Icons/add_dark.png')}
        h='5'
        w='5'
      />
    </Flex>
  );
};

export default Header;
