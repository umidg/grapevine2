import { View, Text, Flex, Box, Input, TextArea, Button } from 'native-base';
import React, { useContext, useState } from 'react';
import { grapevineBackend } from '../../API';
import { UserValue } from '../../Context/UserContext';
import { AtomComponents, Layout } from '../../Exports/index';
import Toast from 'react-native-root-toast';
import { color } from 'react-native-elements/dist/helpers';

const CommentPage = ({ navigation, route }) => {
  const { RoundImage } = AtomComponents;
  const { SignInLayout, BackLayout } = Layout;
  const {
    params: { comments, post_uuid },
  } = route;

  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useContext(UserValue);
  const [_comments, _setComments] = useState(comments);
  const [loading, setLoading] = useState(false);
  const comment = () => {
    if (!loading && commentText.length > 0) {
      setLoading(true);
      grapevineBackend(
        '/comment/create',
        {
          user_uuid: user.uuid,
          post_uuid: post_uuid,
          comment_text: commentText,
        },
        'POST'
      )
        .then(({ data }) => {
          if (data.status) {
            _setComments([..._comments, data.data]);
            setLoading(false);
            setCommentText('');
          }
        })
        .catch((err) => {
          Toast.show('Something Went Wrong', {
            duration: Toast.durations.SHORT,
          });
          setLoading(false);
        });
    }
  };
  return (
    <BackLayout navigation={navigation} color='black' safeArea>
      <SignInLayout>
        <Box h='full' w='full' p='2'>
          <Text
            color='primary'
            fontWeight='600'
            fontSize={24}
            textAlign='center'
          >
            Comments
          </Text>
          {_comments.map((comment) => {
            return (
              <Flex direction='row' key={comment.uuid} my='10px' w='full'>
                <RoundImage
                  image={require('../../../assets/Images/1.png')}
                  size={30}
                />
                <Box ml='2' flex='1' flexDir='row' alignItems='center'>
                  <Text fontSize='md' fontWeight='600'>
                    {comment.user.username}{' '}
                  </Text>
                  <Text fontSize='xs' fontWeight='300'>
                    {comment.comment_text}
                  </Text>
                </Box>
              </Flex>
            );
          })}

          <Box
            w='full'
            flex='1'
            flexDir='col'
            borderTopWidth='1'
            pt='2'
            borderColor='gray.200'
          >
            <TextArea
              fontSize='sm'
              fontWeight='400'
              placeholder='Comment here...'
              color='black'
              borderWidth={2}
              h='16'
              borderColor='gray.400'
              borderRadius='xl'
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
              _focus={{
                bg: 'white',
              }}
              mb='1'
            />
            <Box w='full' display='flex' flexDir='col' justifyContent='center'>
              <Button
                h='10'
                p={0}
                onPress={comment}
                bg={loading ? 'primary:alpha.50' : 'primary'}
                _text={{
                  fontWeight: 'bold',
                  fontSize: '16',
                }}
              >
                Comment
              </Button>
            </Box>
          </Box>
        </Box>
      </SignInLayout>
    </BackLayout>
  );
};

export default CommentPage;
