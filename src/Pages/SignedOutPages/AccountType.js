import React, { useState } from 'react';
import { Box, Text, Center, View, Select, CheckIcon } from 'native-base';
import { AtomComponents, Layout, Hooks } from '../../Exports/index';
const AccountType = ({ navigation }) => {
  console.log(Hooks, 'hooks');
  const { ButtonDark, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const [showDropDown, setShowDropDown] = useState(false);
  const type = ['Brand', 'Agency'];
  const SetAccountType = (type) => {
    if (type == registerData.account_type) {
      setRegisterData({ ...registerData, account_type: null });
    } else {
      setRegisterData({ ...registerData, account_type: type });
    }
  };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout
          navigation={navigation}
          navigate={
            registerData.account_type &&
            (registerData.account_type == 'User'
              ? 'Register'
              : registerData.account_type == 'Brand'
              ? 'Register_Brand'
              : 'Register_Agency')
          }
          next
          nextDisabled={registerData.account_type ? false : true}
        >
          <Box pt='10%' px={5}>
            <View>
              <View w='100%' alignItems={'center'}>
                <Logo />
                <Text
                  fontSize={17}
                  color='#fff'
                  fontWeight={'800'}
                  textAlign='center'
                  mt='2'
                  mb='10'
                >
                  What brings you here
                </Text>
              </View>
              <Center mt='15'>
                <ButtonDark
                  w='50%'
                  h={10}
                  onPress={() => {
                    setShowDropDown(false);
                    SetAccountType('User');
                  }}
                  bg={registerData.account_type == 'User' ? 'dark' : 'light'}
                >
                  <Text fontSize={14} color='#fff' fontWeight={'800'}>
                    User Account
                  </Text>
                </ButtonDark>
                <ButtonDark
                  w='50%'
                  h={10}
                  bg={showDropDown ? 'dark' : 'light'}
                  onPress={() => {
                    SetAccountType('');
                    setShowDropDown(!showDropDown);
                  }}
                >
                  <Text fontSize={14} color='#fff' fontWeight={'800'}>
                    Business Account
                  </Text>
                </ButtonDark>
                {showDropDown && (
                  <Center>
                    <Select
                      bg='dark'
                      borderRadius={'md'}
                      height='10'
                      width='70%'
                      selectedValue={
                        registerData.account_type
                          ? registerData.account_type
                          : ' '
                      }
                      minWidth='200'
                      color={'#fff'}
                      fontWeight='800'
                      accessibilityLabel='Choose '
                      placeholder='Choose '
                      _selectedItem={{
                        bg: 'primary',
                        endIcon: <CheckIcon size='5' color='white' />,
                        color: 'white',
                        _text: {
                          color: 'white',
                        },
                      }}
                      borderWidth='0'
                      mt={1}
                      onValueChange={(itemValue) => SetAccountType(itemValue)}
                    >
                      {type.map((t) => (
                        <Select.Item label={t} value={t} key={t} />
                      ))}
                    </Select>
                  </Center>
                )}
              </Center>
            </View>
            {/* <Center>
              {registerData.account_type ? (
                <ButtonDark
                  w='80%'
                  bg='dark'
                  onPress={() => {
                    if (registerData.account_type == 'User')
                      navigation.navigate('Register');
                    else if (registerData.account_type == 'Brand') {
                      navigation.navigate('Register_Brand');
                    } else navigation.navigate('Register_Agency');
                  }}
                >
                  <Text fontSize={14} color='#fff' fontWeight={'800'}>
                    Next
                  </Text>
                </ButtonDark>
              ) : (
                <ButtonDark w='80%' bg='light'>
                  <Text fontSize={14} color='#fff' fontWeight={'800'}>
                    Next
                  </Text>
                </ButtonDark>
              )}
            </Center> */}
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default AccountType;
