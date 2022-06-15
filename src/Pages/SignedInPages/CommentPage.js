import { View, Text, Flex, Box, Input, Button } from 'native-base';
import React, { useContext, useState } from 'react';
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
  const [_comments, _setComments] = useState(comments);
  const comment = () => {
    if (commentText.length > 0) {
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
          }
        })
        .catch((err) =>
          Toast.show('Something Went Wrong', {
            duration: Toast.durations.SHORT,
          })
        );
    }
  };
  return (
    <BackLayout navigation={navigation} color='#000' safeArea>
      <SignInLayout>
        <Box h='100%' w='100%' p='10%'>
          <Text
            color={'primary'}
            fontWeight='800'
            fontSize={22}
            textAlign='center'
          >
            Comments
          </Text>
          {_comments.map((comment) => {
            return (
              <Flex
                direction='row'
                key={comment.uuid}
                my='10px'
                alignItems={'center'}
              >
                <RoundImage
                  image={require('../../../assets/Images/1.png')}
                  size={30}
                />
                <Text fontSize='9px' fontWeight='800'>
                  {comment.user.username}
                </Text>
                <Text fontSize='9px' fontWeight='300'>
                  {comment.comment_text}
                </Text>
              </Flex>
            );
          })}

          <Flex
            direction='row'
            alignItems={'center'}
            justifyContent='space-between'
          >
            <Input
              fontSize='9px'
              fontWeight='300'
              placeholder='Comment here...'
              color='#000'
              borderWidth={2}
              height={10}
              width='70%'
              borderRadius={'md'}
              value={commentText}
              onChangeText={(text) => setCommentText(text)}
            />
            <Button flex={1} height='90%' p={0} onPress={comment} bg='primary'>
              Comment
            </Button>
          </Flex>
        </Box>
      </SignInLayout>
    </BackLayout>
  );
};

export default CommentPage;
