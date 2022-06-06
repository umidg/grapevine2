/* eslint-disable react/jsx-curly-newline */
import React, { useState, useContext } from 'react';
import { Box, View, Flex, Center, Text, Pressable } from 'native-base';
import { Alert } from 'react-native';
import LayoutFrame from '../../Layout/LayoutFrame';
import Logo from '../../AtomComponents/Logo/Logo';
import ColorWrapper from '../../AtomComponents/ColorWrapper/ColorWrapper';
import RegularImage from '../../AtomComponents/Image/RegularImage';
import ButtonDark from '../../AtomComponents/Buttons/ButtonDark';
import BackIcon from '../../AtomComponents/BackIcon/BackIcon';
import InstagramLoginModel from '../../Modal/InstagramLoginModel';
import TiktokLoginModel from '../../Modal/TiktokLoginModel';
import { RegisterData } from '../../Context/RegisterContext';
import SignupLayout from '../../Layout/SignupLayout';
import GreenTick from '../../../assets/Icons/Tick_green.png';
import InstaImage from '../../../assets/Icons/Instagram_light.png';
import YoutubeImage from '../../../assets/Icons/Youtube_light.png';
import TiktokImage from '../../../assets/Icons/TikTok_light.png';

const ConnectNetworks = ({ navigation }) => {
  const [showInstaModal, setShowInstaModal] = useState(false);
  const [showTiktokModal, setShowTiktokModal] = useState(false);
  const [data, setData] = useContext(RegisterData);

  const instagramLoginSuccess = (token) => {
    setData({ ...data, instagramToken: token });
  };
  const tiktokLoginSuccess = ({ token, posts, refresh_token }) => {
    setData({
      ...data,
      tiktokToken: token,
      tiktokPost: posts,
      tiktok_refresh_token: refresh_token,
    });
  };
  return (
    <LayoutFrame>
      <SignupLayout navigation>
        <Box
          h='100%'
          w='100%'
          bg='loginPageBg'
          pt='15%'
          px={5}
          pb='30'
          justifyContent='space-between'
        >
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
          <Box height='100%'>
            <Box>
              <View w='100%' alignItems='center'>
                <Logo />
                <Text
                  fontSize='17'
                  color='#fff'
                  fontWeight='800'
                  textAlign='center'
                  mt='2'
                >
                  Connect your network
                </Text>
              </View>
              <Center>
                <Center mt={19} w='80%'>
                  <Flex
                    flexDirection='row'
                    justifyContent='space-around'
                    w='70%'
                    mb='10'
                  >
                    <Pressable onPress={() => setShowInstaModal(true)}>
                      <ColorWrapper>
                        <RegularImage h={30} w={30} image={InstaImage} />
                      </ColorWrapper>
                      {data.instagramToken && (
                        <Center>
                          <RegularImage h={10} w={10} image={GreenTick} />
                        </Center>
                      )}
                    </Pressable>
                    <Pressable
                      onPress={() =>
                        // eslint-disable-next-line implicit-arrow-linebreak
                        Alert.alert('Error', 'This feature is comming soon')
                      }
                    >
                      <ColorWrapper>
                        <RegularImage h={30} w={30} image={YoutubeImage} />
                      </ColorWrapper>
                      {data.googleToken && (
                        <Center>
                          <RegularImage h={10} w={10} image={GreenTick} />
                        </Center>
                      )}
                    </Pressable>
                    <Pressable onPress={() => setShowTiktokModal(true)}>
                      <ColorWrapper>
                        <RegularImage h={30} w={30} image={TiktokImage} />
                      </ColorWrapper>
                      {data.tiktokToken && (
                        <Center>
                          <RegularImage h={10} w={10} image={GreenTick} />
                        </Center>
                      )}
                    </Pressable>
                  </Flex>
                  <ButtonDark
                    onPress={() => navigation.navigate('EnterUsername')}
                  >
                    <Text fontSize={14} color='#fff' fontWeight='800'>
                      Next
                    </Text>
                  </ButtonDark>
                  <Box onPress={() => navigation.navigate('EnterUsername')}>
                    <Text fontSize='14' color='#fff' fontWeight='300' mt='5'>
                      Skip
                    </Text>
                  </Box>
                </Center>
              </Center>
            </Box>
          </Box>
        </Box>
      </SignupLayout>
    </LayoutFrame>
  );
};

export default ConnectNetworks;
