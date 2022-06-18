import React from 'react';
import { Text, View, Center } from 'native-base';
import { AtomComponents, Layout } from '../../Exports/index';

const LoginSignup = ({ navigation }) => {
  const { Logo, ButtonDark, ButtonLight } = AtomComponents;
  const { SignoutLayout } = Layout;
  return (
    <SignoutLayout>
      <Center>
        <Logo />
        <Text
          fontSize='16px'
          fontWeight='300'
          textAlign={'center'}
          color='#fff'
          my='5'
        >
          Create, Collaborate, Connect
        </Text>
      </Center>
      <ButtonDark w='70%' onPress={() => navigation.navigate('Login')}>
        Login
      </ButtonDark>
      <ButtonLight
        w='70%'
        onPress={() => navigation.navigate('ContinueWith')}
        borderWidth='2'
        borderColor='dark'
      >
        Sign Up
      </ButtonLight>
    </SignoutLayout>
  );
};

export default LoginSignup;
