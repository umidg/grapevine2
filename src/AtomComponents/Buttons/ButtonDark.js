import React from 'react';
import { Button, Text } from 'native-base';

const ButtonDark = (props) => {
  const { h, w, bg, onPress, children } = props;
  return (
    <Button
      h={h || 50}
      w={w || '100%'}
      justifyContent='center'
      alignItems='center'
      mt='1'
      mb='1'
      borderRadius='full'
      bg={bg || 'buttonDark'}
      onPress={onPress}
      variant='solid'
      _pressed={{
        bg: 'buttonDarkClick',
      }}
    >
      <Text fontSize='14' fontWeight='800' color={bg ? '#000' : '#fff'}>
        {children}
      </Text>
    </Button>
  );
};

export default ButtonDark;
