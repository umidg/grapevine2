import React, { useEffect, useState, useContext } from 'react';
import { Box, Flex, Text, Pressable, Center, Image } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { grapevineBackend } from '../../API';
import { UserValue } from '../../Context/UserContext';

import { MolecularComponents, Layout } from '../../Exports/index';
const NotificationPage = ({ navigation }) => {
  const { Notification } = MolecularComponents;
  const { SignInLayout, BackLayout } = Layout;

  const [user, setUser] = useContext(UserValue);
  const [notifications, setnotification] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      grapevineBackend('/notification/get', {}, 'POST')
        .then(async ({ data }) => {
          if (data.code == 200) {
            setnotification([...data.data.result]);
          } else {
            console.log('Err: Friend Request', data);
          }
        })
        .catch((err) => console.log('err', err.message));
    });
    return unsubscribe;
  }, []);

  return (
    <BackLayout navigation={navigation} color='#000' safeArea>
      <Box h='100%' w='100%' bg='white'>
        <Text fontWeight='800' fontSize={16} textAlign='center' mb='5'>
          Notifications
        </Text>
        <Pressable onPress={() => navigation.navigate('FriendRequest')}>
          <Flex
            flexDirection={'row'}
            justifyContent='space-between'
            alignItems={'center'}
            bg='#3d368218'
            py={3}
            px={5}
          >
            <Text fontSize='16' fontWeight='800' color='#000'>
              Connection Requests
            </Text>

            <AntDesign name='caretright' size={12} color='#000' />
          </Flex>
        </Pressable>
        <SignInLayout>
          <Box h='100%' w='100%' p='2'>
            {/* <Box h='full' w='full'> */}
            {notifications?.length > 0 ? (
              notifications.map((notification) => {
                return (
                  <Notification
                    key={notification.uuid}
                    notification={notification}
                    navigation={navigation}
                  />
                );
              })
            ) : (
              <Center h='100%' w='100%'>
                <Image
                  source={require('../../../assets/Logo/Logo.png')}
                  size={100}
                  resizeMode='contain'
                  p='5'
                  alt='Image'
                />
                <Text fontSize='16' fontWidth='800' color='primary' mt='10'>
                  Sorry, no notifications.
                </Text>
              </Center>
            )}
            {/* <NotificationContainer time="Yesterday" />
          <NotificationContainer time="This Week" /> */}
            {/* </Box> */}
          </Box>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default NotificationPage;
