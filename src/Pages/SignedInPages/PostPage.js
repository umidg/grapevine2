import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Spinner } from 'native-base';
import { Layout, MolecularComponents } from '../../Exports/index';
import { grapevineBackend } from '../../API';
import { UserValue } from '../../Context/UserContext';
const PostPage = ({ navigation, route }) => {
  const {
    params: { post_uuid },
  } = route;
  console.log(post_uuid, 'post_uuid');
  const { PostContainer } = MolecularComponents;
  const [post, setPost] = useState(null);
  const [user, setUser] = useContext(UserValue);
  useEffect(() => {
    grapevineBackend('/post/getPostByUuid', { post_uuid: post_uuid }, 'POST')
      .then(({ data }) => {
        if (data.status) {
          setPost({ ...data.data });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const { SignInLayout, BackLayout } = Layout;
  return (
    <BackLayout navigation={navigation} color='#000' safeArea>
      <Box h='full' w='full' bg='white'>
        <Text fontWeight='800' fontSize={16} textAlign='center' mb='2'>
          Post
        </Text>
        <SignInLayout>
          <Box h='100%' w='100%'>
            {post ? (
              <PostContainer post={post} user={user} navigation={navigation} />
            ) : (
              <Spinner accessibilityLabel='Loading' />
            )}
          </Box>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default PostPage;
