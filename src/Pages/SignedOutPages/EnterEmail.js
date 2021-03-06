import React, { useState, useContext } from 'react';
import { ActivityIndicator } from 'react-native';

import { Text, View, Box, Center } from 'native-base';
import Toast from 'react-native-root-toast';
import LayoutFrame from '../../Layout/LayoutFrame';
import Logo from '../../AtomComponents/Logo/Logo';
import ButtonLight from '../../AtomComponents/Buttons/ButtonLight';
// import InputText from "../../AtomComponents/Input/InputText";
import InputText from '../../AtomComponents/Input/InputText';
import BackIcon from '../../AtomComponents/BackIcon/BackIcon';
import { RegisterData } from '../../Context/RegisterContext';
import { grapevineBackend } from '../../API';
import SignupLayout from '../../Layout/SignupLayout';

const EnterEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [data, setData] = useContext(RegisterData);
  const [loading, setLoading] = useState(false);
  const SendCode = () => {
    if (email.length > 0) {
      setLoading(true);
      grapevineBackend(
        '/auth/emailIsValid',
        {
          email: email.toLowerCase(),
        },
        'POST'
      )
        .then(async (response) => {
          if (response.data.status) {
            setData({ ...data, email });
            navigation.navigate('EnterCode', {
              code: `${response.data.data.code}1`,
            });
          } else {
            Toast.show(response.data.message, {
              duration: Toast.durations.LONG,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log('Err', err);
          setLoading(false);
        });
    }
  };

  return (
    <LayoutFrame>
      <SignupLayout navigation={navigation}>
        <Box
          h='100%'
          w='100%'
          bg='loginPageBg'
          pt='15%'
          px={5}
          pb='30'
          justifyContent='space-between'
        >
          <BackIcon
            onPress={() => {
              navigation.pop();
            }}
          />
          <View>
            <View w='100%' alignItems='center'>
              <Logo />
              <Text
                fontSize={17}
                color='#fff'
                fontWeight='800'
                textAlign='center'
                mt='5'
              >
                We???ll send you a verification code
              </Text>
            </View>
            <View mt={15}>
              <Text fontSize={12} color='#f5f4ff' fontWeight='800'>
                Your Email
              </Text>
              <Center>
                <InputText
                  placeholder='Email'
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </Center>
              <View mt='5'>
                {loading ? (
                  <ButtonLight>
                    <ActivityIndicator size='small' color='#ffffff' />
                  </ButtonLight>
                ) : (
                  <ButtonLight onPress={SendCode}>
                    <Text fontSize={14} color='#fff' fontWeight='800'>
                      Send Code
                    </Text>
                  </ButtonLight>
                )}
              </View>
            </View>
          </View>
        </Box>
      </SignupLayout>
    </LayoutFrame>
  );
};

export default EnterEmail;
