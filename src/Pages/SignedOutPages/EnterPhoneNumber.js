import React, { useContext, useState } from 'react';
import { Text, View, Box } from 'native-base';
// import * as RNLocalize from 'react-native-localize';r
import PhoneInput from 'react-native-phone-number-input';

import { AtomComponents, Layout, Hooks } from '../../Exports/index';

const EnterPhoneNumber = ({ navigation }) => {
  const { ButtonLight, InputNumber, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;

  const [number, setNumber] = useState(null);
  const { registerData, setRegisterData } = Hooks.ContextHook();
  const [loading, setLoading] = useState(false);
  const SendCode = () => {
    if (number.length > 0) {
      setRegisterData({ ...registerData, number: number });
      navigation.navigate('EnterCode', {
        code: '11111',
      });
    }
  };
  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box px={5} pb='20'>
            <View>
              <View w='100%' alignItems={'center'} mb='5'>
                <Logo />
                <Text
                  fontSize={17}
                  color='#fff'
                  fontWeight={'800'}
                  textAlign='center'
                  mt='5'
                >
                  We’ll send you a verification code
                </Text>
              </View>
              <View width='full'>
                <Text fontSize={12} color='#f5f4ff' fontWeight={'800'}>
                  Your phone number{' '}
                </Text>
                <PhoneInput
                  textContainerStyle={{
                    backgroundColor: '#3e3682',
                    color: 'white',
                  }}
                  textInputStyle={{
                    color: 'white',
                  }}
                  codeTextStyle={{
                    color: 'white',
                  }}
                  countryPickerButtonStyle={{
                    backgroundColor: '#3e3682',
                  }}
                  containerStyle={{
                    width: '100%',
                  }}
                  defaultValue={number}
                  defaultCode='GB'
                  layout='first'
                  onChangeText={(text) => {
                    setNumber(text);
                  }}
                  autoFocus
                />
                {/* <InputNumber
                  value={number}
                  onChangeText={(text) => setNumber(text)}
                /> */}
                <View mt='5'>
                  {loading ? (
                    <ButtonLight>
                      <ActivityIndicator size='small' color='#ffffff' />
                    </ButtonLight>
                  ) : (
                    <ButtonLight rounded='2xl' onPress={SendCode}>
                      <Text fontSize={14} color='#fff' fontWeight={'800'}>
                        Send Code
                      </Text>
                    </ButtonLight>
                  )}
                </View>
              </View>
            </View>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default EnterPhoneNumber;
