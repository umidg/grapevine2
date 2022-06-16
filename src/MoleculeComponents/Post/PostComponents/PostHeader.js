import React, { useState } from 'react';
import { Box, Center, Text, Flex, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import RoundImage from '../../../AtomComponents/Image/RoundImage';
import { Entypo } from '@expo/vector-icons';
import { DropDownMenu } from '../../Menu/index';
const PostHeader = ({ username, user_uuid, navigation, address, shared }) => {
  const styles = !shared && {
    borderTopWidth: '1',
    borderBottomWidth: '1',
    borderColor: 'gray.200',
  };

  return (
    <Flex
      direction='row'
      w='100%'
      justifyContent='space-between'
      alignItems='center'
      p='1'
      px='3'
      {...styles}
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
            size='35'
            image={require('../../../../assets/Images/1.png')}
          />
        </Pressable>
        <Box ml='2'>
          <Text fontSize='md' fontWeight='800'>
            {username && username}
          </Text>
          <Text fontSize='10' fontWeight='400'>
            {address}
          </Text>
        </Box>
      </Flex>

      {!shared && (
        <DropDownMenu
          icon={<Entypo name='dots-three-horizontal' size={16} color='black' />}
          options={[{ text: 'Report', onPress: undefined }]}
        />
      )}
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
