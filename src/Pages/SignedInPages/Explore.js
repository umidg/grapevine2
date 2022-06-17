import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Flex, Pressable, Slide, Box, Text } from 'native-base';
import { grapevineBackend } from '../../API';
import { userHook } from '../../Hooks';
import { AntDesign } from '@expo/vector-icons';
import {
  AtomComponents,
  MolecularComponents,
  Layout,
  PageComponent,
} from '../../Exports/index';

const ExplorePage = ({ navigation }) => {
  const {
    Explore: { Features, Collection },
  } = PageComponent;
  const { Search } = AtomComponents;
  const { Notification } = MolecularComponents;
  const { SignInLayout } = Layout;
  const [users, setUsers] = useState([]);
  const [focus, setFocus] = useState(false);

  const searchUser = async (name) => {
    if (name.length > 2) {
      grapevineBackend('/auth/search', { name: name }, 'POST')
        .then(async ({ data }) => {
          if (data.status) {
            setUsers([...data.data]); //TODO: Bipul only show profile of unblocked
          }
        })
        .catch((err) => console.log(err));
    } else {
      setUsers([]);
    }
  };

  const profileClick = () => {};

  // const sendRequest = (d) => {
  //   if (d.id === user.id) console.log("navigate to user profile");

  //   grapevineBackend(
  //     "/friendship/sendfriendrequest",
  //     { user_request: user.id, user_accept: d.id },
  //     "POST"
  //   )
  //     .then(async ({ data }) => {
  //       if (data?.data?.code != 400) {
  //         let clonedUser = JSON.parse(JSON.stringify(user));
  //         clonedUser.friends.push({ ...data?.data, friendId: d.id });
  //         setUserDetails(clonedUser);
  //         console.log("Friend request sent", clonedUser);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  useEffect(() => {
    return () => setFocus(false);
  }, []);
  return (
    <Box h='100%' w='100%' bg='white'>
      <Box display='flex' flexDir='row' justifyContent='space-between' p='3'>
        <Search flex={1} onSearch={searchUser} onFocus={() => setFocus(true)} />
        {focus && (
          <Pressable onPress={() => setFocus(false)} alignSelf='center'>
            <Text textAlign='center' fontSize='sm' pl='2'>
              Cancel
            </Text>
          </Pressable>
        )}
      </Box>
      <ScrollView style={{ height: '100%' }}>
        {focus ? (
          <View w='100%' h='87%' bg='white'>
            <View>
              {users?.map((person) => {
                return (
                  <Notification
                    onPress={() => {
                      setFocus(false);
                      navigation.navigate('FriendProfile', {
                        user_uuid: person.uuid,
                      });
                    }}
                    key={person.id}
                    profileImage={require('../../../assets/Images/3.png')}
                    time=''
                    username={person.username}
                  />
                );
              })}
            </View>
          </View>
        ) : (
          <>
            <View style={styles.featureContainer}>
              <Features />
            </View>

            <View style={styles.collectionContainer}>
              <Collection />
            </View>
          </>
        )}
      </ScrollView>
    </Box>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  searchContainer: { paddingLeft: 30, paddingRight: 30, marginTop: 30 },
  filterContainer: { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
  collectionContainer: {
    marginTop: 10,
  },
  featureContainer: {
    marginTop: 10,
  },
});
