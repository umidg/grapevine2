import {
  View,
  Text,
  Box,
  Flex,
  ScrollView,
  Input,
  Button,
  Image,
  Pressable,
} from 'native-base';
import React, { useEffect, useState, useRef, useContext } from 'react';
import { Alert } from 'react-native';
import { grapevineBackend } from '../../API';
import { UserValue } from '../../Context/UserContext';
import { AtomComponents } from '../../Exports/index';

const { io } = require('socket.io-client');
const ChatRoom = ({ navigation, route }) => {
  const { ButtonDark, RegularImage, RoundImage } = AtomComponents;

  const { friend_uuid, username, friendship_uuid, chatroom_uuid, valid_room } =
    route.params;
  const [message, setMessage] = useState('');
  const [user, setUser] = useContext(UserValue);
  const [messages, setMessages] = useState([]);
  const [valid, setValid] = useState(valid_room);
  const socket = useRef(null);
  const scrollViewref = useRef(null);
  const sendMessage = () => {
    if (message.length > 0) {
      socket.current.emit('messageSent', {
        user_id: user.uuid,
        content: message,
        to_user: friend_uuid,
      });
      setMessage('');
    }
  };
  const useGrape = () => {
    grapevineBackend(
      '/grape/use',
      { user_uuid: user.uuid, chatroom_uuid: chatroom_uuid },
      'POST'
    )
      .then(({ data }) => {
        if (data.status) {
          setValid(true);
        } else {
          Alert.alert('', data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    socket.current = io(
      `http://192.168.1.70:4000/?chatRoomid=${chatroom_uuid}`
    );
    grapevineBackend(`/chat/getRoomChats/${chatroom_uuid}`, {}, 'POST')
      .then(({ data }) => {
        console.log(data);
        if (data.status) setMessages([...data.data]);
      })
      .catch((err) => console.log(err));
    return () => {
      socket.current.disconnect();
    };
  }, []);
  useEffect(() => {
    socket.current.on('connection', (socket) => {
      console.log(socket.id);
    });
    socket.current.on('messageReceive', (data) => {
      var temp = messages;
      temp.push(data);
      setMessages([...temp]);
    });
  }, [messages]);

  return (
    <Box h='100%' w='100%'>
      <Flex
        direction='row'
        justifyContent={'space-between'}
        alignItems='center'
        bg='gray.100'
        borderWidth={1}
        borderColor='buttonPrimaryColor'
        h='10%'
        pl='5'
        pr='5'
      >
        <Flex direction='row' alignItems={'center'}>
          <Pressable onPress={() => navigation.pop()}>
            <Image
              alt='image'
              source={require('../../../assets/Icons/back_dark.png')}
              alt='back'
              h='5'
              w='5'
              m='2'
            />
          </Pressable>
          <RoundImage
            image={require('../../../assets/Images/1.png')}
            size={30}
          />
          <Text color={'buttonPrimaryColor'}>@{username}</Text>
        </Flex>
        <RegularImage
          image={require('../../../assets/Icons/Options.png')}
          h={10}
          w={10}
        />
      </Flex>
      {valid ? (
        <>
          <Box w='100%' h='80%'>
            <ScrollView
              ref={scrollViewref}
              onContentSizeChange={() => {
                scrollViewref.current.scrollToEnd({ animated: true });
              }}
            >
              {messages.map((m) => {
                if (m.from_user == user.id) {
                  return (
                    <Flex
                      key={m.id}
                      p='2'
                      direction='row'
                      justifyContent={'flex-end'}
                    >
                      <Text bg='blue.800' color='#fff' w='50%' p='5'>
                        {m.content}
                      </Text>
                    </Flex>
                  );
                }
                return (
                  <View key={m.id} p='2'>
                    <Text bg='red.800' color='#fff' w='50%' p='5'>
                      {m.content}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </Box>
          <Box w='100%' h='10%'>
            <Flex
              direction='row'
              justifyContent={'space-between'}
              pl='1'
              pr='1'
              h='100%'
            >
              <Input
                bg='#fff'
                borderWidth={0.5}
                width='80%'
                value={message}
                onChangeText={(t) => setMessage(t)}
                h='100%'
              />
              <Button w='20%' onPress={sendMessage} h='100%'>
                Send
              </Button>
            </Flex>
          </Box>
        </>
      ) : (
        <Box h='100%' w='100%' justifyContent={'center'} alignItems='center'>
          <Text>You cannot Send Message now</Text>
          <Box w='50%'>
            <ButtonDark onPress={useGrape}>Use Grape</ButtonDark>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ChatRoom;
