import { View, Text, ScrollView, Center, Box, Radio } from 'native-base';
import React, { useEffect, useContext, useState } from 'react';
import { Pressable } from 'react-native';
import { grapevineBackend } from '../../API';
// import Tiktokvideo from "../../AtomComponents/TiktokWebview/Tiktokvideo";
import { UserValue } from '../../Context/UserContext';
import { Tiktokvideo } from '../../AtomComponents/index';
import { AntDesign } from '@expo/vector-icons';

const TiktokVideoContainer = ({ onPress, selectedId }) => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useContext(UserValue);
  useEffect(() => {
    grapevineBackend(
      '/post/userTikTokVideos',
      {
        user_uuid: user.uuid,
      },
      'POST'
    )
      .then(({ data }) => {
        if (data.status) {
          setVideos([...data.data]);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(selectedId, 'id');

  return (
    <ScrollView>
      <Box flex='1' m='2'>
        {videos.length > 0 ? (
          videos.map((v) => (
            <Box key={v.uuid}>
              <Pressable
                onPress={() => {
                  onPress(v);
                }}
              >
                <Box position='relative'>
                  <Box position='absolute' zIndex={10000} top='2' left='2'>
                    <AntDesign
                      name={'checkcircle'}
                      size={24}
                      color={`${
                        selectedId !== v.id ? 'rgba(121,73,231,0.4)' : '#7949E7'
                      }`}
                      style={{
                        textShadowOffset: { width: 5, height: 2 },
                        shadowColor: '#000000',
                        shadowOpacity: 0.5,
                      }}
                    />
                  </Box>
                  <Box>
                    <Tiktokvideo
                      uri={v.embed_link}
                      size='100'
                      h={100}
                      w='30%'
                      buttonSize='40'
                    />
                  </Box>
                </Box>
              </Pressable>
            </Box>
          ))
        ) : (
          <Box h='100%'>
            <Text
              color='primary'
              fontWeight={'800'}
              fontSize={20}
              textAlign='center'
              mt={10}
            >
              No TikTokVideos
            </Text>
          </Box>
        )}
      </Box>
    </ScrollView>
  );
};

export default TiktokVideoContainer;
