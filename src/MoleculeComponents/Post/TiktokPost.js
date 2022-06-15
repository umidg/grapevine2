import React, { useMemo } from 'react';
import { Box, Center, Text, Image, Flex } from 'native-base';
import PostHeader from './PostComponents/PostHeader';
import CommentsContainer from './PostComponents/CommentsContainer';
import LikeContainer from './PostComponents/LikeContainer';

import Tiktokvideo from '../../AtomComponents/TiktokWebview/Tiktokvideo';
import ColorWrapper from '../../AtomComponents/ColorWrapper/ColorWrapper';
const TiktokPost = ({
  data,
  user,
  navigation,
  showLike = true,
  showComment = true,
}) => {
  const time = useMemo(() => {
    const date1 = new Date(data.created_at);
    const date2 = new Date();

    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);
    const diffInMin = Math.floor(diffInTime / 60000);
    if (diffInMin < 1) return 'few moments ago';
    else if (diffInMin < 60) return diffInMin + ' min ago';
    else if (diffInMin < 1140) return diffInMin / 60 + ' hour ago';
    return diffInDays + ' days ago';
  }, [data]);
  return (
    <Box w='100%' mt='2px'>
      <Box p='2'>
        <PostHeader
          username={data.username}
          navigation={navigation}
          user_id={data.user_id}
        />
      </Box>
      {data?.post && (
        <Text mb={3} ml={3} italic>
          {data.post}
        </Text>
      )}
      <Box w='100%'>
        <Box position='absolute' right={5} top={2} zIndex={1000}>
          <ColorWrapper>
            <Image
              alt='image'
              source={require('../../../assets/Icons/TikTok_light.png')}
              alt='logo'
              h={3}
              w={3}
            />
          </ColorWrapper>
        </Box>
        <Tiktokvideo uri={data.video_url} />
      </Box>
      {showLike && (
        <Box pl={1} pr='3'>
          <LikeContainer
            likes={data.likes}
            post_uuid={data.uuid}
            user={user}
            timeStamp={time}
          />
        </Box>
      )}
      {showComment && (
        <Pressable
          onPress={() => {
            if (navigation) {
              navigation.navigate('CommentPage', {
                comments: data.comments,
                post_uuid: data.uuid,
              });
            }
          }}
        >
          <Box p='2'>
            <CommentsContainer comments={data.comments} user={user} />
          </Box>
        </Pressable>
      )}
    </Box>
  );
};

export default TiktokPost;
