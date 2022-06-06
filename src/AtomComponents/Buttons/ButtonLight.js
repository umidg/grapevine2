import React from 'react';
import { Text, Button } from 'native-base';

const ButtonLight = (props) => {
  const { h, w, bg, onPress, children, ...rest } = props;
  return (
    <Button
      h={h || 50}
      w={w || '100%'}
      justifyContent='center'
      alignItems='center'
      mt='1'
      mb='1'
      borderRadius='full'
      bg={bg || 'buttonLight'}
      onPress={onPress}
      variant='solid'
      _pressed={{
        bg: 'buttonDarkClick',
      }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      <Text fontSize='14' fontWeight='800' color={bg ? '#000' : '#fff'}>
        {children}
      </Text>
    </Button>
  );
};

export default ButtonLight;
