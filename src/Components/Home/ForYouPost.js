import React from 'react';
import { PostContainer } from '../../MoleculeComponents/index';
import { Center, Box, ScrollView, Image, Text } from 'native-base';
const ForYouPost = ({ user, navigation, forYouPosts, loadNextPage }) => {
  const onScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadNextPage();
    }
  };

  return (
    <>
      {forYouPosts.length === 0 ? (
        <Center h='100%' w='100%'>
          <Image
            source={require('../../../assets/Logo/Logo.png')}
            size={100}
            resizeMode='contain'
            p='5'
            alt='Image'
          />
          <Text fontSize='16' fontWidth='800' color='primary' mt='10'>
            Sorry, no posts yet.
          </Text>
        </Center>
      ) : (
        <Box pb='70' h='100%'>
          <ScrollView
            h='100%'
            onScroll={({ nativeEvent }) => {
              onScroll(nativeEvent);
            }}
          >
            {forYouPosts.map((post, index) => {
              return (
                <Box mt={index === 0 ? '12' : '0'} key={post.uuid}>
                  <PostContainer
                    post={post}
                    user={user}
                    navigation={navigation}
                  />
                </Box>
              );
            })}
          </ScrollView>
        </Box>
      )}
    </>
  );
};

export default ForYouPost;
