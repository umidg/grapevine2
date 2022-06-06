import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Box, Text, Center, View } from 'native-base';
import LayoutFrame from '../../Layout/LayoutFrame';
import Logo from '../../AtomComponents/Logo/Logo';
import ButtonLight from '../../AtomComponents/Buttons/ButtonLight';
import SignupLayout from '../../Layout/SignupLayout';
import InputCode from '../../AtomComponents/Input/InputCode';
import BackIcon from '../../AtomComponents/BackIcon/BackIcon';

const EnterCode = ({ navigation, route }) => {
  const [inputCode, setInputCode] = useState('');
  const { code } = route.params;
  const compareCode = () => {
    if (code === inputCode) {
      navigation.navigate('AccountType');
    } else {
      Alert.alert('Alert', 'code incorrect');
    }
  };
  return (
    <LayoutFrame>
      <SignupLayout navigation={navigation}>
        <Box h='100%' w='100%' pt='15%' px={5} justifyContent='space-between'>
          <BackIcon onPress={() => navigation.pop()} />
          <View>
            <View w='100%' alignItems='center'>
              <Logo />
              <Text
                fontSize={17}
                color='#fff'
                fontWeight='800'
                textAlign='center'
                mt='2'
                italic
              >
                Enter Code
              </Text>
            </View>
            <View mt='15'>
              <Center w='100%'>
                <InputCode
                  w='70%'
                  value={inputCode}
                  onChangeText={(text) => setInputCode(text)}
                />
              </Center>
              <View mt='2'>
                <ButtonLight onPress={compareCode}>
                  <Text fontSize={14} color='#fff' fontWeight='800'>
                    Verify
                  </Text>
                </ButtonLight>
                <Text
                  fontSize={13}
                  textAlign='center'
                  color='#fff'
                  fontWeight='800'
                  mt='2'
                >
                  Didn’t recieve your code?
                  <Text color='buttonDark'>&nbsp;Resend</Text>
                </Text>
              </View>
            </View>
          </View>
        </Box>
      </SignupLayout>
    </LayoutFrame>
  );
};

export default EnterCode;
