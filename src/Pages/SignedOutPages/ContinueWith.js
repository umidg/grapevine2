import React, { useState, useContext } from 'react';
import { View, Text, Center, Pressable } from 'native-base';
import LayoutFrame from '../../Layout/LayoutFrame';
import Logo from '../../AtomComponents/Logo/Logo';
import ButtonDark from '../../AtomComponents/Buttons/ButtonDark';

import RegularImage from '../../AtomComponents/Image/RegularImage';
import BackIcon from '../../AtomComponents/BackIcon/BackIcon';
import InstagramLoginModel from '../../Modal/InstagramLoginModel';
import TiktokLoginModel from '../../Modal/TiktokLoginModel';
import { RegisterData } from '../../Context/RegisterContext';
import InstaColorImage from '../../../assets/Icons/instagram_color.png';
import TiktokColorImage from '../../../assets/Icons/tiktok_color.png';
import GoogleColorImage from '../../../assets/Icons/google.png';
import SignupWrapper from '../../Layout/SignupLayout';

const ContinueWith = ({ navigation }) => {
  const [showInstaModal, setShowInstaModal] = useState(false);
  const [showTiktokModal, setShowTiktokModal] = useState(false);
  const [data, setData] = useContext(RegisterData);

  const instagramLoginSuccess = (token) => {
    setData({ ...data, instagramToken: token });
    navigation.navigate('AccountType');
  };
  const tiktokLoginSuccess = ({ token, posts, refreshToken }) => {
    setData({
      ...data,
      tiktokToken: token,
      tiktokPost: posts,
      tiktokRefreshToken: refreshToken,
    });
    navigation.navigate('EnterEmail');
  };
  return (
    <LayoutFrame>
      <SignupWrapper navigation={navigation}>
        <Center h='100%' w='100%'>
          <BackIcon onPress={() => navigation.pop()} />
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
            <View alignItems='center' mb='5'>
              <Logo />
            </View>
            <Pressable onPress={() => setShowInstaModal(true)}>
              <Center
                h='50'
                w='100%'
                bg='#fff'
                my={1}
                borderRadius='full'
                flexDirection='row'
              >
                <RegularImage image={InstaColorImage} h={20} w={20} />
                <Text fontSize={14} fontWeight='800'>
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
                flexDirection='row'
              >
                <RegularImage image={TiktokColorImage} h={20} w={20} />
                <Text fontSize={14} fontWeight='800'>
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
              flexDirection='row'
            >
              <RegularImage image={GoogleColorImage} h={20} w={20} />
              <Text fontSize={14} fontWeight='800'>
                Continue with Google
              </Text>
            </Center>
            <ButtonDark onPress={() => navigation.navigate('EnterEmail')}>
              Continue with Email
            </ButtonDark>
            <ButtonDark onPress={() => navigation.navigate('EnterPhoneNumber')}>
              Continue with Phone Number
            </ButtonDark>
            <ButtonDark onPress={() => navigation.navigate('EnterPhoneNumber')}>
              Explore the App
            </ButtonDark>
          </View>
        </Center>
      </SignupWrapper>
    </LayoutFrame>
  );
};

export default ContinueWith;
