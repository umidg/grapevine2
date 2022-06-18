import React, { useEffect, useState } from 'react';
import { PostContainer } from '../../MoleculeComponents/index';
import { Spinner, Center, Box, ScrollView, Image, Text } from 'native-base';
import { grapevineBackend } from '../../API';
const ForYouPost = ({ user, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ page: 1, limit: 5 });
  const fetchPosts = () => {
    setLoading(true);
    grapevineBackend(
      `/post/forYouPost?page=${params.page}&limit=${params.limit}`,
      {},
      'POST'
    )
      .then(async ({ data }) => {
        if (data.status == true) {
          setLoading(false);
          setError(false);
          setParams({ ...data.data.next });
          setPosts([...posts, ...data.data.result]);
        }
      })
      .catch((err) => {
        setError(true);
      });
  };

  const onScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 0;
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom &&
      params.page
    ) {
      console.log(
        layoutMeasurement,
        contentOffset,
        contentSize,
        layoutMeasurement.height,
        contentOffset.y,
        contentSize.height,
        paddingToBottom,
        params.page
      );
      fetchPosts();
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      {loading ? (
        <Center h='100%' w='100%'>
          <Spinner accessibilityLabel='Loading' />
        </Center>
      ) : posts.length === 0 ? (
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
            {posts.map((post) => {
              return (
                <PostContainer
                  post={post}
                  key={post.uuid}
                  user={user}
                  navigation={navigation}
                />
              );
            })}
          </ScrollView>
        </Box>
      )}
    </>
  );
};

export default ForYouPost;
