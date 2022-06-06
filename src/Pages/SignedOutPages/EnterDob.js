/* eslint-disable no-confusing-arrow */
import { Alert } from 'react-native';
import React, { useContext } from 'react';
import { Box, Text, Center, View, Select, Flex } from 'native-base';
import LayoutFrame from '../../Layout/LayoutFrame';
import Logo from '../../AtomComponents/Logo/Logo';
import BackIcon from '../../AtomComponents/BackIcon/BackIcon';
import ButtonDark from '../../AtomComponents/Buttons/ButtonDark';

import { RegisterData } from '../../Context/RegisterContext';
import SignupLayout from '../../Layout/SignupLayout';
import InputText from '../../AtomComponents/Input/InputText';

const EnterDob = ({ navigation }) => {
  const [data, setData] = useContext(RegisterData);
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
      // eslint-disable-next-line operator-linebreak
      data?.dob?.day?.length > 0 &&
      // eslint-disable-next-line operator-linebreak
      data?.dob?.month?.length > 0 &&
      // eslint-disable-next-line operator-linebreak
      data?.dob?.year?.length > 0 &&
      // eslint-disable-next-line operator-linebreak
      data?.gender &&
      data?.ethinicity
    ) {
      if (data.account_type === 'Brand' || data.account_type === 'User') {
        navigation.navigate('BrandCreator');
      } else {
        navigation.navigate('InterestsAgency');
      }
    } else {
      Alert.alert('Invalid', 'Enter all values');
    }
  };

  return (
    <LayoutFrame>
      <SignupLayout navigation>
        <Box h='100%' w='100%' bg='loginPageBg' pt='15%' px='5' pb='30'>
          <BackIcon onPress={() => navigation.pop()} />
          <Box h='90%' justifyContent='space-between'>
            <Box>
              <View w='100%' alignItems='center'>
                <Logo />
              </View>
              <Center mt='15'>
                <Text color='#fff' fontWeight='800' m='3' fontSize={14}>
                  Date Of Birth
                </Text>
                <Flex direction='row'>
                  <Box w={70} h={10} p={2}>
                    <InputText
                      borderWidth='0'
                      w='100%'
                      h='100%'
                      color='#fff'
                      placeholder='dd'
                      fontWeight='800'
                      fontSize={14}
                      keyboardType='number-pad'
                      maxLength={2}
                      value={data.dob ? data.dob.day : null}
                      onChangeText={(text) => {
                        setData({ ...data, dob: { ...data.dob, day: text } });
                      }}
                    />
                  </Box>
                  <Box w={70} h={10} p={2}>
                    <InputText
                      borderWidth='0'
                      w='100%'
                      h='100%'
                      color='#fff'
                      placeholder='mm'
                      fontWeight='800'
                      fontSize={14}
                      keyboardType='number-pad'
                      maxLength={2}
                      value={data.dob ? data.dob.month : null}
                      onChangeText={(text) => {
                        setData({ ...data, dob: { ...data.dob, month: text } });
                      }}
                    />
                  </Box>
                  <Box w={70} h={10} p={2}>
                    <InputText
                      borderWidth='0'
                      w='70'
                      h='100%'
                      color='#fff'
                      placeholder='yy'
                      fontWeight='800'
                      fontSize={14}
                      keyboardType='number-pad'
                      maxLength={4}
                      value={data.dob ? data.dob.year : null}
                      onChangeText={(text) => {
                        setData({ ...data, dob: { ...data.dob, year: text } });
                      }}
                    />
                  </Box>
                </Flex>
                <Text color='#fff' fontWeight='800' mt='5' mb='3' fontSize={14}>
                  Gender
                </Text>
                <Flex w='100%' direction='row' justify='space-around'>
                  <ButtonDark
                    w='40%'
                    h={10}
                    m={1}
                    onPress={() => setData({ ...data, gender: 'Male' })}
                    bg={
                      data.gender === 'Male' ? 'buttonDarkClick' : 'buttonDark'
                    }
                  >
                    <Text fontSize={14} color='#fff' fontWeight='800'>
                      Male
                    </Text>
                  </ButtonDark>

                  <ButtonDark
                    w='40%'
                    h={10}
                    m={1}
                    onPress={() => setData({ ...data, gender: 'Female' })}
                    bg={
                      data.gender === 'Female'
                        ? 'buttonDarkClick'
                        : 'buttonDark'
                    }
                  >
                    <Text fontSize={14} color='#fff' fontWeight='800'>
                      Female
                    </Text>
                  </ButtonDark>
                </Flex>
                <ButtonDark
                  w='70%'
                  h={10}
                  m={1}
                  onPress={() => setData({ ...data, gender: 'Other' })}
                  bg={
                    data.gender === 'Other' ? 'buttonDarkClick' : 'buttonDark'
                  }
                >
                  <Text fontSize={14} color='#fff' fontWeight='800'>
                    Prefer not to say
                  </Text>
                </ButtonDark>
                <Text color='#fff' fontWeight='800' mt='5' mb='3' fontSize={14}>
                  Ethnicity
                </Text>
                <Center>
                  <Select
                    bg='buttonDark'
                    borderRadius='md'
                    height='10'
                    width='70%'
                    selectedValue={data.ethinicity}
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
                    onValueChange={(itemValue) => {
                      setData({ ...data, ethinicity: itemValue });
                    }}
                  >
                    {ethinicity.map(
                      (node) =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        node.disable ? (
                          <Select.Item
                            disabled
                            label={
                              // eslint-disable-next-line react/jsx-wrap-multilines
                              <Text fontSize={20} fontWeight='800' color='#000'>
                                {node.value}
                              </Text>
                            }
                            value={node.value}
                            key={node.value}
                          />
                        ) : (
                          <Select.Item
                            label={node.value}
                            value={node.value}
                            key={node.value}
                          />
                        )
                      // eslint-disable-next-line function-paren-newline
                    )}
                  </Select>
                </Center>
              </Center>
            </Box>
            <Center w='100%' mt='10'>
              <ButtonDark w='80%' onPress={validate}>
                <Text fontSize='14' color='#fff' fontWeight='800'>
                  Next
                </Text>
              </ButtonDark>
            </Center>
          </Box>
        </Box>
      </SignupLayout>
    </LayoutFrame>
  );
};

export default EnterDob;
