import React, { useState, useEffect, useMemo } from 'react';
import { Box, Center, Flex, Text, Image, Button, Pressable } from 'native-base';
import RoundImage from '../../AtomComponents/Image/RoundImage';
import { grapevineBackend } from '../../API';
const Notification = ({ notification, navigation }) => {
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (
      notification.type == 'like' ||
      notification.type == 'comment' ||
      notification.type == 'share'
    ) {
      grapevineBackend(
        '/post/getPostByUuid',
        { post_uuid: notification.action_uuid },
        'POST'
      )
        .then(({ data }) => {
          if (data.status) {
            setPost({ ...data.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [notification]);

  const time = useMemo(() => {
    const date1 = new Date(notification.created_at);
    const date2 = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.floor(diffInTime / oneDay);

    const diffInMin = Math.floor(diffInTime / 60000);
    if (diffInMin < 1) return '0 m';
    else if (diffInMin < 60) return diffInMin + ' m';
    else if (diffInMin < 1140) return Math.floor(diffInMin / 60) + ' h';
    return `${diffInDays} d `;
  }, [notification]);

  switch (notification.type) {
    case 'like':
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('PostPage', {
              post_uuid: notification.action_uuid,
            })
          }
          py={2}
        >
          <Box
            flex='1'
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems='center'
          >
            <RoundImage
              size='35'
              image={require('../../../assets/Images/1.png')}
            />

            <Box pl={2} flex='1' flexDirection={'column'}>
              <Pressable
                onPress={() =>
                  navigation.navigate('FriendProfile', {
                    user_uuid: activity.user_uuid,
                  })
                }
              >
                <Text fontSize={16} fontWeight='800'>
                  {notification.from_user_username}
                </Text>
              </Pressable>
              <Box
                flex='1'
                flexDirection='row'
                justifyContent='space-between'
                width='100%'
              >
                <Text>
                  liked your <Text fontWeight='bold'>post.</Text>
                </Text>
                <Text color='gray.500'>{time}</Text>
              </Box>
            </Box>
          </Box>
        </Pressable>
        // <Pressable
        //   onPress={() =>
        //     navigation.navigate('PostPage', {
        //       post_uuid: notification.action_uuid,
        //     })
        //   }
        //   py={2}
        // >
        //   {post && (
        //     <Flex
        //       direction='row'
        //       justifyContent={'flex-start'}
        //       alignItems='center'
        //     >
        //       <Box flex={1}>
        //         <RoundImage
        //           size={10}
        //           image={require('../../../assets/Images/1.png')}
        //         />
        //       </Box>
        //       <Box h='100%' flex={7} pl={2}>
        //         <Pressable
        //           onPress={() =>
        //             navigation.navigate('FriendProfile', {
        //               user_uuid: notification.from_user_uuid,
        //             })
        //           }
        //         >
        //           <Text fontSize={16} fontWeight='800'>
        //             {notification.from_user_username}
        //           </Text>
        //         </Pressable>
        //         <Box
        //           ml={2}
        //           display='flex'
        //           flexDirection={'row'}
        //           justifyContent='flex-start'
        //           alignItems={'center'}
        //         >
        //           liked your post.
        //           {time}
        //         </Box>
        //       </Box>
        //     </Flex>
        //   )}
        // </Pressable>
      );
    case 'comment':
      return (
        <Pressable
          onPress={() =>
            navigation.navigate('PostPage', {
              post_uuid: notification.action_uuid,
            })
          }
          py={2}
          px={5}
        >
          {post && (
            <Flex
              direction='row'
              justifyContent={'flex-start'}
              alignItems='center'
            >
              <Box flex={1}>
                <RoundImage
                  size={10}
                  image={require('../../../assets/Images/1.png')}
                />
              </Box>
              <Box h='100%' flex={7} pl={2}>
                <Pressable
                  onPress={() =>
                    navigation.navigate('FriendProfile', {
                      user_uuid: notification.from_user_uuid,
                    })
                  }
                >
                  <Text fontSize={16} fontWeight='800'>
                    {notification.from_user_username}
                  </Text>
                </Pressable>
                <Box
                  ml={2}
                  display='flex'
                  flexDirection={'row'}
                  justifyContent='flex-start'
                  alignItems={'center'}
                >
                  commented on your post
                  {time}
                </Box>
              </Box>
            </Flex>
          )}
        </Pressable>
      );
    case 'share':
      return (
        <Pressable
          onPress={() =>
            navigation.navigate("PostPage", {
              post_uuid: activity.action_uuid,
            })
          }
          py={2}
        >
          <Box
            flex="1"
            flexDirection={"row"}
            justifyContent={"flex-start"}
            alignItems="center"
          >
            <RoundImage
              size="35"
              image={require("../../../assets/Images/1.png")}
            />

            <Box pl={2} flex="1" flexDirection={"column"}>
              <Pressable
                onPress={() =>
                  navigation.navigate("FriendProfile", {
                    user_uuid: activity.user_uuid,
                  })
                }
              >
                <Text fontSize={16} fontWeight="800">
                  {activity.user.username}
                </Text> 
              </Pressable>
              <Box
                flex="1"
                flexDirection="row"
                justifyContent="space-between"
                width="100%"
              >
                <Text>
                  uploaded a new <Text fontWeight="bold">post.</Text>
                </Text>
                <Text color="gray.500">{time}</Text>
              </Box>
            </Box>
          </Box>
        </Pressable>
        // <Pressable
        //   onPress={() =>
        //     navigation.navigate('PostPage', {
        //       post_uuid: notification.action_uuid,
        //     })
        //   }
        //   py={2}
        //   px={5}
        // >
        //   {post && (
        //     <Flex
        //       direction='row'
        //       justifyContent={'flex-start'}
        //       alignItems='center'
        //     >
        //       <Box flex={1}>
        //         <RoundImage
        //           size={10}
        //           image={require('../../../assets/Images/1.png')}
        //         />
        //       </Box>
        //       <Box h='100%' flex={7} pl={2}>
        //         <Pressable
        //           onPress={() =>
        //             navigation.navigate('FriendProfile', {
        //               user_uuid: notification.from_user_uuid,
        //             })
        //           }
        //         >
        //           <Text fontSize={16} fontWeight='800'>
        //             {notification.from_user_username}
        //           </Text>
        //         </Pressable>
        //         <Box
        //           ml={2}
        //           display='flex'
        //           flexDirection={'row'}
        //           justifyContent='flex-start'
        //           alignItems={'center'}
        //         >
        //           shared your post
        //           {time}
        //         </Box>
        //       </Box>
        //     </Flex>
        //   )}
        // </Pressable>
      );
    default:
      return <></>;
  }
};

export default Notification;
