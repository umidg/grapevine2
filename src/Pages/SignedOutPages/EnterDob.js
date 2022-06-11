import { Alert } from 'react-native';
import React from 'react';
import { Box, Text, Center, View, Select, Flex, Input } from 'native-base';
import { AtomComponents, Layout, Hooks } from '../../Exports/index';

const EnterDob = ({ navigation }) => {
  const { ButtonDark, ButtonLight, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const ethinicity = [
    { value: 'Asian or Asian British', disable: true },
    { value: 'Indian', disable: false },
    { value: 'Pakistani', disable: false },
    { value: 'Bangladeshi', disable: false },
    { value: 'Chinese', disable: false },
    { value: 'Any other Asian background', disable: false },
    { value: 'Black, Black British, Caribbean or African', disable: true },
    { value: 'Caribbean', disable: false },
    { value: 'African', disable: false },
    {
      value: 'Any other Black, Black British, or Caribbean background',
      disable: false,
    },
    { value: 'Mixed or multiple ethnic groups', disable: true },
    { value: 'White and Black Caribbean', disable: false },
    { value: 'White and Black African', disable: false },
    { value: 'White and Asian', disable: false },
    {
      value: 'Any other Mixed or multiple ethnic background',
      disable: false,
    },
    { value: 'White', disable: true },
    {
      value: 'English, Welsh, Scottish, Northern Irish or British',
      disable: false,
    },
    { value: 'Irish', disable: false },
    { value: 'Gypsy or Irish Traveller', disable: false },
    { value: 'Roma', disable: false },
    { value: 'Any other White background', disable: false },
    { value: 'Other ethnic group', disable: true },
    { value: 'Arab', disable: false },
    { value: 'Any other ethnic group', disable: false },
  ];

  const validate = () => {
    if (
      // registerData.dob &&
      // registerData.dob.day &&
      // registerData.dob.day.length > 0 &&
      // registerData.dob.month &&
      // registerData.dob.month.length > 0 &&
      // registerData.dob.year &&
      // registerData.dob.year.length > 0 &&
      registerData.gender &&
      registerData.ethinicity
    ) {
      if (
        registerData.account_type == 'Brand' ||
        registerData.account_type == 'User'
      ) {
        navigation.navigate('BrandCreator');
      } else {
        navigation.navigate('InterestsAgency');
      }
    } else {
      Alert.alert('Invalid', 'Enter all values');
    }
  };

  return (
    <SignoutLayout>
      <LoginLayout navigation={navigation}>
        <BackLayout navigation={navigation}>
          <Box pt='15%' px='5' pb='30'>
            <View>
              <View w='100%' alignItems='center'>
                <Logo />
              </View>
              <Center mt='15'>
                <Text
                  color='#fff'
                  fontWeight={'800'}
                  m='3'
                  fontSize={14}
                  italic
                >
                  Date Of Birth
                </Text>
                <Flex direction='row'>
                  <ButtonLight w={70} h={10} m={1} p={0}>
                    <Input
                      borderWidth='0'
                      w='100%'
                      h='100%'
                      color='#fff'
                      placeholder='dd'
                      fontWeight={'800'}
                      bg='red.400'
                      fontSize={14}
                      p={0}
                      zIndex={1000}
                      keyboardType='number-pad'
                      maxLength={2}
                      value={registerData.dob ? registerData.dob.day : null}
                      onChangeText={(text) =>
                        setRegisterData({
                          ...registerData,
                          dob: { ...registerData.dob, day: text },
                        })
                      }
                    />
                  </ButtonLight>
                  <ButtonLight w={70} h={10} m={1} p={0}>
                    <Input
                      borderWidth='0'
                      w='100%'
                      h='100%'
                      color='#fff'
                      placeholder='mm'
                      fontWeight={'800'}
                      fontSize={14}
                      p={0}
                      keyboardType='number-pad'
                      maxLength={2}
                      value={registerData.dob ? registerData.dob.month : null}
                      onChangeText={(text) =>
                        setRegisterData({
                          ...registerData,
                          dob: { ...registerData.dob, month: text },
                        })
                      }
                    />
                  </ButtonLight>
                  <ButtonLight w={70} h={10} m={1} p={0}>
                    <Input
                      borderWidth='0'
                      w='100%'
                      h='100%'
                      color='#fff'
                      placeholder='yy'
                      fontWeight={'800'}
                      fontSize={14}
                      p={0}
                      keyboardType='number-pad'
                      maxLength={4}
                      value={registerData.dob ? registerData.dob.year : null}
                      onChangeText={(text) =>
                        setRegisterData({
                          ...registerData,
                          dob: { ...registerData.dob, year: text },
                        })
                      }
                    />
                  </ButtonLight>
                </Flex>
                <Text
                  color='#fff'
                  fontWeight={'800'}
                  mt='5'
                  mb='3'
                  fontSize={14}
                  italic
                >
                  Gender
                </Text>
                <Flex w='100%' direction='row' justify='space-around'>
                  <ButtonDark
                    w={'40%'}
                    h={10}
                    m={1}
                    onPress={() =>
                      setRegisterData({ ...registerData, gender: 'Male' })
                    }
                    bg={registerData.gender == 'Male' ? 'dark' : 'light'}
                  >
                    <Text fontSize={14} color='#fff' fontWeight={'800'}>
                      Male
                    </Text>
                  </ButtonDark>

                  <ButtonDark
                    w={'40%'}
                    h={10}
                    m={1}
                    onPress={() =>
                      setRegisterData({ ...registerData, gender: 'Female' })
                    }
                    bg={registerData.gender == 'Female' ? 'dark' : 'light'}
                  >
                    <Text fontSize={14} color='#fff' fontWeight={'800'}>
                      Female
                    </Text>
                  </ButtonDark>
                </Flex>
                <ButtonDark
                  w={'70%'}
                  h={10}
                  m={1}
                  onPress={() =>
                    setRegisterData({ ...registerData, gender: 'Other' })
                  }
                  bg={registerData.gender == 'Other' ? 'dark' : 'light'}
                >
                  <Text fontSize={14} color='#fff' fontWeight={'800'}>
                    Prefer not to say
                  </Text>
                </ButtonDark>
                <Text
                  color='#fff'
                  fontWeight={'800'}
                  mt='5'
                  mb='3'
                  fontSize={14}
                  italic
                >
                  Ethnicity
                </Text>
                <Center>
                  <Select
                    bg='rgba(61,54,130,0.6705882352941176)'
                    borderRadius={'md'}
                    height='10'
                    width={'70%'}
                    selectedValue={registerData.ethinicity}
                    minWidth='200'
                    color={'#fff'}
                    fontWeight='800'
                    accessibilityLabel='Choose '
                    placeholder='Choose '
                    _selectedItem={{
                      bg: 'teal.600',
                      // endIcon: <CheckIcon size="5" />,
                    }}
                    borderWidth='0'
                    mt={1}
                    onValueChange={(itemValue) =>
                      setRegisterData({
                        ...registerData,
                        ethinicity: itemValue,
                      })
                    }
                  >
                    {ethinicity.map((data) =>
                      data.disable ? (
                        <Select.Item
                          disabled
                          label={
                            <Text fontSize={20} fontWeight='800' color='#000'>
                              {data.value}
                            </Text>
                          }
                          value={data.value}
                          key={data.value}
                        />
                      ) : (
                        <Select.Item
                          label={data.value}
                          value={data.value}
                          key={data.value}
                        />
                      )
                    )}
                  </Select>
                </Center>
              </Center>
            </View>
            <Center w='100%' mt='10'>
              <ButtonDark w='80%' onPress={validate}>
                <Text fontSize='14' color='#fff' fontWeight='800'>
                  Next
                </Text>
              </ButtonDark>
            </Center>
          </Box>
        </BackLayout>
      </LoginLayout>
    </SignoutLayout>
  );
};

export default EnterDob;
