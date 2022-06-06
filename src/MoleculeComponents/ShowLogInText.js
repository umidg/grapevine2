import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Box, Text } from 'native-base';

const ShowLogInText = ({ onPress }) => (
  <Box position='absolute' zIndex={9}>
    <TouchableOpacity onPress={onPress}>
      <Text fontSize='13' fontWeight='800' color='white' textAlign='center'>
        Already have an account? &nbsp;
        <Text color='buttonDark'>Login</Text>
      </Text>
    </TouchableOpacity>
  </Box>
);

export default ShowLogInText;
