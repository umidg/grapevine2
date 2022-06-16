import React, { useState, useEffect, useContext } from 'react';
import { Box, Center, Text, Flex, Pressable, Image } from 'native-base';
import { UserValue } from '../../Context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';

import {
  MolecularComponents,
  Layout,
  PageComponent,
} from '../../Exports/index';
const Home = ({ navigation }) => {
  const { SignInLayout } = Layout;
  const {
    Home: { ConnectedPosts, ForYouPost },
  } = PageComponent;
  const [postType, setPostType] = useState('connected');
  const [error, setError] = useState(false);
  const [user, setUser] = useContext(UserValue);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     grapevineBackend("/post/getAllPost?page=1&limit=10", {}, "POST")
  //       .then(async ({ data }) => {
  //         setError(false);
  //         if (data.status == true) {
  //           setPost([...data.data.result]);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Err", err);
  //         setError(true);
  //       });
  //     grapevineBackend("/post/forYouPost", {}, "POST")
  //       .then(async ({ data }) => {
  //         setError(false);
  //         if (data.status == true) {
  //           setForYouPost([...data.data.result]);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Err", err);
  //         setError(true);
  //       });
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <Box h='100%' w='100%'>
      <LinearGradient
        colors={[
          'rgba(255,255,255,1)',
          'rgba(255,255,255,0.9)',
          'rgba(255,255,255,0)',
          'transparent',
        ]}
        style={{
          height: 100,
          width: '100%',
          position: 'absolute',
          zIndex: 300,
        }}
      />
      <Flex
        direction='row'
        justifyContent='center'
        alignItems='center'
        h='70'
        w='100%'
        top={0}
        zIndex={400}
        position='absolute'
      >
        <Pressable onPress={() => setPostType('foryou')}>
          <Text
            fontWeight={postType == 'foryou' ? '800' : '400'}
            mx={1}
            shadow='1'
          >
            For You
          </Text>
        </Pressable>
        <Text>|</Text>
        <Pressable onPress={() => setPostType('connected')}>
          <Text
            fontWeight={postType == 'connected' ? '800' : '400'}
            mx={1}
            shadow='1'
          >
            Connected
          </Text>
        </Pressable>
      </Flex>
      <Box h='100%' w='100%' mt='5' bg='white'>
        {error ? (
          <Center h='100%' w='100%'>
            <Text fontWeight={'800'}>Error occured</Text>
          </Center>
        ) : postType == 'connected' ? (
          <ConnectedPosts user={user} navigation={navigation} />
        ) : (
          <ForYouPost user={user} navigation={navigation} />
        )}
      </Box>
    </Box>
  );
};

export default Home;
