import React from 'react';
import { Box, Text, Flex, Center } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { ButtonDark } from '../AtomComponents';
const LoginLayout = (props) => {
  const { navigate, navigation, children, next, nextDisabled, onPress } = props;
  const onNext = () => {
    navigation.navigate(navigate);
  };

  console.log(nextDisabled, 'dis');

  return (
    <Flex
      h='100%'
      w='100%'
      direction='column'
      justifyContent={'space-around'}
      alignItems='center'
      // zIndex={0}
    >
      <Box w='100%'>{children}</Box>
      <Box w='100%'>
        {next && (
          <Center>
            <ButtonDark
              w='80%'
              bg={nextDisabled ? 'light' : 'dark'}
              onPress={() => !nextDisabled && (onPress ? onPress() : onNext())}
            >
              <Text fontSize={14} color='#fff' fontWeight={'800'}>
                Next
              </Text>
            </ButtonDark>
          </Center>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text
            fontSize={13}
            fontWeight='800'
            color='#fff'
            textAlign={'center'}
            my='2'
          >
            Already have an account? <Text color='dark'>Login</Text>
          </Text>
        </TouchableOpacity>
      </Box>
    </Flex>
  );
};

export default LoginLayout;
