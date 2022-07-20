import React, { useState } from 'react';
import { Text, Box, Link } from 'native-base';
import { RegularImage } from '../../AtomComponents/index';
import { Pressable } from 'react-native';
import Toast from 'react-native-root-toast';

import GetTiktokInfo from '../../Hooks/Tiktok/getTiktokInfo';
import { connectAccount } from '../../API/Tiktok/connectAccount';

const NetworkContainer = ({ setShowTiktokModal, user }) => {
  const { tiktokLogin } = GetTiktokInfo();

  return (
    <Box>
      <Text textAlign='center' fontFamily='light '>
        {`Your Network`}
      </Text>
      <Box flex='1' flexDir='row' justifyContent='center'>
        <RegularImage
          h={20}
          w={20}
          image={require('../../../assets/Logo/logo(1).png')}
        />
        <RegularImage
          h={20}
          w={20}
          image={require('../../../assets/Icons/instagram_color.png')}
        />
        {user.tiktok ? (
          <Pressable
            onPress={() => {
              Toast.show('Already Connected', {
                duration: Toast.durations.SHORT,
              });
            }}
          >
            <RegularImage
              h={20}
              w={20}
              image={require('../../../assets/Icons/TikTok.png')}
            />
          </Pressable>
        ) : (
          <Pressable onPress={() => tiktokLogin(connectAccount)}>
            <RegularImage
              h={20}
              w={20}
              image={require('../../../assets/Icons/TikTok.png')}
            />
          </Pressable>
        )}

        <RegularImage
          h={20}
          w={20}
          image={require('../../../assets/Icons/youtube_color.png')}
        />
      </Box>

      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default NetworkContainer;
