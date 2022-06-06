import React from 'react';
import { Box, Input } from 'native-base';

const InputText = ({ h, w, placeholder, value, onChangeText, ...rest }) => (
  <Box
    bg='buttonDark'
    borderRadius='xl'
    flexDirection='row'
    alignItems='center'
    h={h || 53}
    w={w || '100%'}
  >
    <Input
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      borderWidth='0'
      w='100%'
      color='white'
      fontWeight='800'
      fontSize={12}
      _input={{ backgroundColor: 'buttonDark' }}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    />
  </Box>
);

export default InputText;
