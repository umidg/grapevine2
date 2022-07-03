import React, { memo, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Flex,
  Pressable,
  Text,
  View,
  Modal,
  Button,
  Center,
} from 'native-base';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Toast from 'react-native-root-toast';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import SharePost from '../../../Hooks/Posts/sharePost';
import LikePost from '../../../Hooks/Like/likePost';
import UnLikePost from '../../../Hooks/Like/unLikePost';

const LikeContainer = ({ liked, user, post_uuid, timeStamp, count }) => {
  const [openModal, setOpenModal] = useState(false);
  const share = SharePost(() => setOpenModal(false));
  const likePost = LikePost();
  const unlikePost = UnLikePost();
  const handleLike = async () => {
    if (liked) {
      // setLiked(false);
      unlikePost.mutate({
        post_uuid: post_uuid,
        user_uuid: user.uuid,
      });
    } else {
      // setLiked(true);

      likePost.mutate({
        post_uuid: post_uuid,
        user_uuid: user.uuid,
      });
    }
  };

  const handleShare = () => {
    Toast.show('Sharing', {
      duration: Toast.durations.LONG,
    });
    share.mutate({
      post_uuid: post_uuid,
      user_uuid: user.uuid,
      username: user.username,
      keys: user.intrests,
    });
  };
  // useEffect(() => {
  //   let likeLength = 0;
  //   likes.forEach((element) => {
  //     if (!element.disliked) {
  //       likeLength++;
  //       if (element.user_uuid == user.uuid) {
  //         setLiked(true);
  //       }
  //     }
  //   });
  //   SetLikeCount(likeLength);
  // }, []);

  return (
    <Box>
      <Flex
        direction='row'
        justifyContent='center'
        alignItems='center'
        w='100%'
        mt='10px'
        borderTopWidth='1'
        borderBottomWidth='1'
        borderColor='gray.200'
        px='3'
        py='2'
      >
        <Box w='3/4'>
          <Box
            display='flex'
            flexDir={'row'}
            justifyContent='space-between'
            w='full'
          >
            <Pressable onPress={handleLike} alignItems='center'>
              {liked ? (
                <AntDesign name='heart' size={20} color='red' p='2' />
              ) : (
                <AntDesign name='hearto' size={20} color='black' p='2' />
              )}
              <Text fontSize='8' fontFamily='bold'>
                Like
              </Text>
            </Pressable>
            <Center>
              <FontAwesome5 name='comment' size={20} color='#000' p='2' />
              <Text fontSize='8' fontFamily='bold'>
                Interaction
              </Text>
            </Center>
            <Center>
              <Ionicons name='people-outline' size={20} color='gray' />
              <Text fontSize='8' fontFamily='light'>
                People
              </Text>
            </Center>
            <Center>
              <MaterialCommunityIcons
                name='shopping-outline'
                size={20}
                color='gray'
              />
              <Text fontSize='8' fontFamily='light'>
                Products
              </Text>
            </Center>
            <Center>
              <FontAwesome name='lightbulb-o' size={20} color='gray' />
              <Text fontSize='8' fontFamily='light'>
                Inspo
              </Text>
            </Center>
            <Pressable onPress={() => setOpenModal(true)} alignItems='center'>
              <MaterialCommunityIcons
                name='share-outline'
                size={20}
                color='black'
              />
              <Text fontSize='8' fontFamily='bold'>
                Share
              </Text>
            </Pressable>
          </Box>
        </Box>
      </Flex>
      <Box flex='1' flexDir='row' justifyContent='space-between' px='2' pt='2'>
        <Text fontSize='12' fontWeight='800' fontFamily='bold'>
          {`${count} Like${count > 1 ? 's' : ''}`}
        </Text>
        <Text fontSize='12' color='black' fontFamily='light'>
          {timeStamp}
        </Text>
      </Box>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Content maxWidth='350'>
          <Modal.CloseButton />
          <Modal.Header>
            <Text fontFamily='bold'>Share</Text>
          </Modal.Header>
          <Modal.Body>
            <Text fontFamily='light'>Do you want to share this post?</Text>
          </Modal.Body>
          <Modal.Footer>
            <Box display={'flex'} flexDir='row' justifyContent='flex-end'>
              <Button
                onPress={handleShare}
                bg='primary'
                mr='2'
                fontFamily='bold'
              >
                Yes
              </Button>
              <Button
                onPress={() => setOpenModal(false)}
                bg='primary'
                fontFamily='bold'
              >
                No
              </Button>
            </Box>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default memo(LikeContainer);
