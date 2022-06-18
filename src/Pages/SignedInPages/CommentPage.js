import { View, Text, Flex, Box, Input, TextArea, Button } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { grapevineBackend } from '../../API';
import { UserValue } from '../../Context/UserContext';
import { AtomComponents, Layout } from '../../Exports/index';
import Toast from 'react-native-root-toast';

const CommentPage = ({ navigation, route }) => {
  const { RoundImage } = AtomComponents;
  const { SignInLayout, BackLayout } = Layout;
  const {
    params: { comments, post_uuid },
  } = route;

  const [commentText, setCommentText] = useState('');
  const [user, setUser] = useContext(UserValue);
  const [_comments, _setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    _setComments([...comments]);
  }, []);

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
          {_comments.map((comment) => {
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
                <Box ml='2' flex='1' flexDir='row' pr='5'>
                  <Text fontSize='sm' fontWeight='700'>
                    {comment.user.username}{' '}
                  </Text>
                  <Text fontSize='sm' fontWeight='300' textAlign='left'>
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
            p='2'
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
                borderRadius='full'
                mb='5'
              >
                Comment
              </Button>
            </Box>
          </Box>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default CommentPage;
