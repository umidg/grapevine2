import React, { useState, useContext } from 'react';
import { View, Text, Center, Pressable } from 'native-base';
import { AtomComponents, Modal, Layout, Hooks } from '../../Exports/index';
const ContinueWith = ({ navigation }) => {
  const { ButtonDark, RegularImage, Logo } = AtomComponents;
  const { InstagramLoginModel, TiktokLoginModel } = Modal;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;

  const [showInstaModal, setShowInstaModal] = useState(false);
  const [showTiktokModal, setShowTiktokModal] = useState(false);
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const instagramLoginSuccess = (token) => {
    console.log(token);
    setRegisterData({ ...registerData, instagramToken: token });
    navigation.navigate('AccountType');
  };
  const tiktokLoginSuccess = ({ token, posts, refresh_token }) => {
    setRegisterData({
      ...registerData,
      tiktokToken: token,
      tiktokPost: posts,
      tiktok_refresh_token: refresh_token,
    });
    navigation.navigate('EnterEmail');
  };
  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Center>
            <InstagramLoginModel
              show={showInstaModal}
              close={() => setShowInstaModal(false)}
              loginSuccess={(d) => instagramLoginSuccess(d)}
            />
            <TiktokLoginModel
              show={showTiktokModal}
              close={() => setShowTiktokModal(false)}
              loginSuccess={(d) => tiktokLoginSuccess(d)}
            />
            <View w='80%' p='5'>
              <View alignItems={'center'} mb='5'>
                <Logo />
              </View>
              <Pressable onPress={() => setShowInstaModal(true)}>
                <Center
                  h='50'
                  w='100%'
                  bg='#fff'
                  my={1}
                  borderRadius='full'
                  flexDirection={'row'}
                >
                  <RegularImage
                    image={require('../../../assets/Icons/instagram_color.png')}
                    h={20}
                    w={20}
                  />
                  <Text fontSize={14} fontWeight='800' italic>
                    Continue with Instagram
                  </Text>
                </Center>
              </Pressable>
              <Pressable onPress={() => setShowTiktokModal(true)}>
                <Center
                  h='50'
                  w='100%'
                  bg='#fff'
                  my={1}
                  borderRadius='full'
                  flexDirection={'row'}
                >
                  <RegularImage
                    image={require('../../../assets/Icons/tiktok_color.png')}
                    h={20}
                    w={20}
                  />
                  <Text fontSize={14} fontWeight='800' italic>
                    Continue with TikTok
                  </Text>
                </Center>
              </Pressable>
              <Center
                h='50'
                w='100%'
                bg='#fff'
                my={1}
                borderRadius='full'
                flexDirection={'row'}
              >
                <RegularImage
                  image={require('../../../assets/Icons/google.png')}
                  h={20}
                  w={20}
                />
                <Text fontSize={14} fontWeight='800' italic>
                  Continue with Google
                </Text>
              </Center>
              <ButtonDark onPress={() => navigation.navigate('EnterEmail')}>
                Continue with Email
              </ButtonDark>
              <ButtonDark
                onPress={() => navigation.navigate('EnterPhoneNumber')}
              >
                Continue with Phone Number
              </ButtonDark>
              <ButtonDark
                onPress={() => navigation.navigate('EnterPhoneNumber')}
              >
                Explore the App
              </ButtonDark>
            </View>
          </Center>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default ContinueWith;
