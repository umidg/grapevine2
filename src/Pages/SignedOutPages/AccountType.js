import React, { useState, useContext } from 'react';
import { Box, Text, Center, View, Select } from 'native-base';
import LayoutFrame from '../../Layout/LayoutFrame';
import Logo from '../../AtomComponents/Logo/Logo';
import BackIcon from '../../AtomComponents/BackIcon/BackIcon';
import ButtonDark from '../../AtomComponents/Buttons/ButtonDark';
import { RegisterData } from '../../Context/RegisterContext';
import SignupLayout from '../../Layout/SignupLayout';

const AccountType = ({ navigation }) => {
  const [data, setData] = useContext(RegisterData);
  const [showDropDown, setShowDropDown] = useState(false);
  const type = ['Brand', 'Agency'];
  const SetAccountType = (datatype) => {
    if (datatype === data.account_type) {
      setData({ ...data, account_type: null });
    } else {
      setData({ ...data, account_type: datatype });
    }
  };

  return (
    <LayoutFrame>
      <SignupLayout navigation={navigation}>
        <Box h='100%' w='100%' pt='15%' px={5}>
          <BackIcon onPress={() => navigation.pop()} />
          <Box h='80%' justifyContent='space-between'>
            <View w='100%' alignItems='center'>
              <Logo />
              <Text
                fontSize={17}
                color='#fff'
                fontWeight='800'
                textAlign='center'
                mt='2'
              >
                What brings you here
              </Text>
            </View>
            <Center mt='15'>
              <ButtonDark
                w='70%'
                h={10}
                onPress={() => {
                  setShowDropDown(false);
                  SetAccountType('User');
                }}
                bg={
                  data.account_type === 'User'
                    ? 'buttonDarkClick'
                    : 'buttonDark'
                }
              >
                <Text fontSize={14} color='#fff' fontWeight='800'>
                  User Account
                </Text>
              </ButtonDark>
              <ButtonDark
                w='70%'
                h={10}
                onPress={() => setShowDropDown(!showDropDown)}
              >
                <Text fontSize={14} color='#fff' fontWeight='800'>
                  Business Account
                </Text>
              </ButtonDark>
              {showDropDown && (
                <Center>
                  <Select
                    bg='buttonDark'
                    borderRadius='md'
                    height='10'
                    width='70%'
                    selectedValue={data.account_type || ''}
                    minWidth='200'
                    color='#fff'
                    fontWeight='800'
                    accessibilityLabel='Choose '
                    placeholder='Choose '
                    _selectedItem={{
                      bg: 'buttonLight',
                      color: 'white',
                      _text: {
                        color: 'white',
                        bold: '700',
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

            <Center>
              {data.account_type ? (
                <ButtonDark
                  w='80%'
                  bg='buttonDark'
                  onPress={() => {
                    if (data.account_type === 'User') {
                      navigation.navigate('Register');
                    } else if (data.account_type === 'Brand') {
                      navigation.navigate('Register_Brand');
                    } else navigation.navigate('Register_Agency');
                  }}
                >
                  <Text fontSize={14} color='#fff' fontWeight='800'>
                    Next
                  </Text>
                </ButtonDark>
              ) : (
                <ButtonDark w='80%' bg='buttonDarkClick'>
                  <Text fontSize={14} color='#fff' fontWeight='800'>
                    Next
                  </Text>
                </ButtonDark>
              )}
            </Center>
          </Box>
        </Box>
      </SignupLayout>
    </LayoutFrame>
  );
};

export default AccountType;
