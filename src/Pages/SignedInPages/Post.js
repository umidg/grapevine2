import {
  Box,
  Flex,
  Image,
  Text,
  TextArea,
  View,
  Pressable,
  Center,
} from 'native-base';
import React, { useState, useContext, useMemo } from 'react';
import { UserValue } from '../../Context/UserContext';
import { grapevineBackend } from '../../API';
import { AntDesign } from '@expo/vector-icons';
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { AtomComponents, PageComponent } from '../../Exports/index';
import UploadPost from '../../Hooks/Posts/uploadPost';
const PostPage = ({ navigation }) => {
  const posts = UploadPost();
  const { RoundImage, Tiktokvideo } = AtomComponents;
  const {
    Post: { TiktokVideoContainer },
  } = PageComponent;

  const [user, setUser] = useContext(UserValue);
  const [post, setPost] = useState('');
  const [type, setType] = useState('text');
  const [tiktokVideo, setTiktokVideo] = useState(null);
  const uploadPost = async () => {
    let data = {
      title: 'Title',
      post_type: type,
      user_uuid: user.uuid,
      keys: user.intrests,
      username: user.username,
    };

    if (type == 'text') {
      if (post.length < 1) {
        Toast.show('enter post', {
          duration: Toast.durations.SHORT,
        });
        return;
      }
      data.post = post;
    } else if (type == 'tiktok') {
      if (!tiktokVideo) {
        Toast.show('Select a video', {
          duration: Toast.durations.SHORT,
        });

        return;
      } else {
        navigation.navigate('Post_Instagram_Tiktok_Youtube', {
          tiktokVideo: tiktokVideo,
        });
        return;
      }
    }
    Toast.show('Posting', {
      duration: Toast.durations.SHORT,
    });
    setPost('');
    posts.mutate(data);
  };

  const layout = useMemo(() => {
    switch (type) {
      case 'text':
        return (
          <Box h='100%' w='100%'>
            <Flex
              direction='row'
              alignItems='center'
              justifyContent={'space-between'}
              px='4'
            >
              <RoundImage
                image={require('../../../assets/Images/1.png')}
                size='12'
              />
              <TextArea
                placeholder='Start typing here...'
                borderWidth='0'
                w='90%'
                mt='8'
                bg='white'
                fontSize='16'
                fontFamily='light'
                onChangeText={(text) => setPost(text)}
                value={post}
                _focus={{
                  bg: 'white',
                }}
              ></TextArea>
            </Flex>
          </Box>
        );
      case 'tiktok':
        return (
          <View h='100%' w='100%'>
            <View h='25%' w='100%' bg='gray.200'>
              {tiktokVideo && tiktokVideo.embed_link && (
                <Tiktokvideo uri={tiktokVideo.embed_link} size='200' />
              )}
            </View>
            <Center h='5%' w='100%' bg='#fff'>
              <Text
                fontWeight={'800'}
                fontSize={14}
                color='primary'
                fontFamily='bold'
              >
                TikTok
              </Text>
            </Center>
            <View h='70%' w='100%'>
              <TiktokVideoContainer
                onPress={(video) => setTiktokVideo({ ...video })}
                selectedId={tiktokVideo && tiktokVideo.id}
              />
            </View>
          </View>
        );
    }
  }, [type, post, tiktokVideo]);

  return (
    <Box h='100%' w='100%' bg='white'>
      <Flex
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        px='5'
        mb='5'
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Text
            fontSize={14}
            fontWeight='300'
            color={'#000'}
            fontFamily='light'
          >
            Cancel
          </Text>
        </Pressable>

        <Pressable onPress={uploadPost}>
          <Box
            bg='primary'
            p='1'
            px='3'
            borderRadius={'md'}
            _text={{
              color: 'white',
              fontFamily: 'bold',
            }}
          >
            {type == 'text' ? 'Post' : 'Next'}
          </Box>
        </Pressable>
      </Flex>
      {layout}

      <Flex
        direction='row'
        alignItems='center'
        justifyContent={'space-between'}
        bg='#343749'
        borderRadius={'full'}
        position={'absolute'}
        px='5'
        py='3'
        mr='5'
        right='0'
        bottom='25%'
      >
        <AntDesign
          name='instagram'
          size={24}
          color={type == 'instagram' ? '#fff' : '#66686b'}
          style={{
            marginRight: 10,
          }}
        />
        <Pressable onPress={() => setType('tiktok')}>
          <FontAwesome5
            name='tiktok'
            size={24}
            color={type == 'tiktok' ? '#fff' : '#66686b'}
            style={{
              marginRight: 10,
            }}
          />
        </Pressable>
        <Pressable
          onPress={() =>
            navigation.navigate('Post_Instagram_Tiktok_Youtube', {
              tiktokVideo: tiktokVideo,
            })
          }
        >
          <AntDesign
            name='youtube'
            size={24}
            color={type == 'youtube' ? '#fff' : '#66686b'}
            style={{
              marginRight: 10,
            }}
          />
        </Pressable>

        <Pressable onPress={() => setType('text')}>
          <Entypo
            name='message'
            size={30}
            color={type == 'text' ? '#fff' : '#66686b'}
          />
        </Pressable>
      </Flex>
    </Box>
  );
};

export default PostPage;
