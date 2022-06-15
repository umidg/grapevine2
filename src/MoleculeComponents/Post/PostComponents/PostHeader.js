import React, { useState } from 'react';
import { Box, Center, Text, Flex, View, Image, Pressable } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import RegularImage from '../../../AtomComponents/Image/RegularImage';
import RoundImage from '../../../AtomComponents/Image/RoundImage';
import { Entypo } from '@expo/vector-icons';

const PostHeader = ({ username, user_uuid, navigation, address }) => {
  const [showReport, setShowReport] = useState(false);
  return (
    <Flex
      direction='row'
      w='100%'
      justifyContent='space-between'
      alignItems='center'
      borderTopWidth='1'
      borderBottomWidth='1'
      borderColor='gray.200'
      p='1'
      px='3'
    >
      <Flex direction='row' alignItems='center'>
        <Pressable
          onPress={() => {
            navigation?.navigate('FriendProfile', {
              user_uuid: user_uuid,
            });
          }}
        >
          <RoundImage
            size={30}
            image={require('../../../../assets/Images/1.png')}
          />
        </Pressable>
        <Box ml='2'>
          <Text fontSize='md' fontWeight='600'>
            @{username ? username : 'mollymae'}
          </Text>
          <Text fontSize='10' fontWeight='300'>
            {address}
          </Text>
        </Box>
      </Flex>
      {showReport && (
        <Box
          top={8}
          right={-5}
          w='20%'
          py={2}
          alignItems={'center'}
          borderWidth='1'
          borderColor={'#d3d3d3'}
        >
          <Text>Report</Text>
        </Box>
      )}
      <Pressable onPress={() => setShowReport(!showReport)}>
        <Entypo name='dots-three-horizontal' size={16} color='black' />
      </Pressable>
    </Flex>
  );
};

const style = StyleSheet.create({
  verifiedContainer: {
    height: 13,
    width: 13,
    borderRadius: 3,
    backgroundColor:
      'gradient(90deg, rgba(81,98,241,1) 0%, rgba(121,73,231,1) 100%)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickIcon: {
    position: 'relative',
    height: 13,
    width: 13,
  },
});
export default PostHeader;
