import { View, Text, Flex, Box, Input, TextArea, Button } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { grapevineBackend } from '../../API';
import { UserValue } from '../../Context/UserContext';
import { AtomComponents, Layout } from '../../Exports/index';
import Toast from 'react-native-root-toast';

const { RoundImage } = AtomComponents;
const { SignInLayout, BackLayout } = Layout;

const CommentPage = ({ navigation, route }) => {
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
      <Box h='full' w='full' bg='white'>
        <Text fontWeight='800' fontSize={16} textAlign='center' mb='2'>
          Comments
        </Text>
        <SignInLayout>
          {_comments.length > 0 ? (
            _comments.map((comment) => {
              return (
                <Flex
                  direction='row'
                  key={comment.uuid}
                  my='10px'
                  w='full'
                  px='2'
                >
                  <RoundImage
                    image={require('../../../assets/Images/1.png')}
                    size={30}
                  />
                  <Box ml='2' flex='1' flexDirection='row' pr='5'>
                    <Text fontSize='sm' fontWeight='700'>
                      {comment.user.username}{' '}
                    </Text>
                    <Text fontSize='sm' fontWeight='300' textAlign='left'>
                      {comment.comment_text}
                    </Text>
                  </Box>
                </Flex>
              );
            })
          ) : (
            <Box alignItems='center' m='10'>
              No comments yet.
            </Box>
          )}

          <Box
            w='full'
            display='flex'
            flexDirection='row'
            borderTopWidth='1'
            borderColor='gray.200'
            alignItems='center'
            p='1'
          >
            <RoundImage
              boxClass={{
                mt: '5',
                mr: '1',
                borderColor: 'white',
              }}
              flex='0.2'
              alignSelf='center'
              size='36'
              image={require('../../../assets/Images/1.png')}
            />
            <TextArea
              autoFocus
              fontSize='sm'
              fontWeight='400'
              placeholder={`Add a comment as ${user.username}`}
              color='black'
              borderWidth={1}
              h='12'
              flex='1'
              borderColor='gray.400'
              borderRadius='3xl'
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
              _focus={{
                bg: 'white',
              }}
              alignItems='center'
              m='1'
              mt='5'
              InputRightElement={
                <Button
                  _text={{
                    color: 'primary',
                  }}
                >
                  Post
                </Button>
              }
            />
            {/* <Box
              w='full'
              display='flex'
              flexDirection='column'
              justifyContent='center'
            >
              <Button
                h='10'
                p={0}
                onPress={comment}
                bg={loading ? 'primary:alpha.50' : 'primary'}
                _text={{
                  fontWeight: 'bold',
                  fontSize: '16',
                }}
                borderRadius='full'
                mb='5'
              >
                Comment
              </Button>
            </Box> */}
          </Box>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default CommentPage;
