import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Flex, Pressable, Slide, Box, Text } from "native-base";
import { grapevineBackend } from "../../API";
import { userHook } from "../../Hooks";
import { AntDesign } from "@expo/vector-icons";
import {
  AtomComponents,
  MolecularComponents,
  Layout,
  PageComponent,
} from "../../Exports/index";

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
    console.log("name", name);
    grapevineBackend("/auth/search", { name: name }, "POST")
      .then(async ({ data }) => {
        if (data.status) {
          setUsers([...data.data]); //TODO: Bipul only show profile of unblocked
        }
      })
      .catch((err) => console.log(err));
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
    <SignInLayout>
      <Box h="100%" w="100%">
        <ScrollView style={{ height: "100%" }}>
          <View h="100%">
            <Flex
              style={styles.searchContainer}
              direction="row"
              justifyContent={"space-between"}
            >
              <Search onSearch={searchUser} onFocus={() => setFocus(true)} />
              {focus && (
                <Pressable onPress={() => setFocus(false)}>
                  <Text>Cancle</Text>
                </Pressable>
              )}
            </Flex>
            {focus ? (
              <View w="100%" h="87%" bg="#fff" bottom={0}>
                <View>
                  <View flex={1} h="100%" w="100%" p={2} py={10}>
                    <View>
                      {users?.map((person) => {
                        return (
                          <Notification
                            onPress={() => {
                              setFocus(false);
                              navigation.navigate("FriendProfile", {
                                user_uuid: person.uuid,
                              });
                            }}
                            key={person.id}
                            profileImage={require("../../../assets/Images/3.png")}
                            // message={`Connect With ${person.username}`}
                            time=""
                            username={person.username}
                          />
                        );
                      })}
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
            <View>
              <View style={styles.featureContainer}>
                <Features />
              </View>

              <View style={styles.collectionContainer}>
                <Collection />
              </View>
            </View>
          </View>
        </ScrollView>
      </Box>
    </SignInLayout>
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
