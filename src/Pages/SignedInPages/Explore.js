import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Flex, Pressable, Slide, Box } from "native-base";
import { SignInLayout } from "../../Layout/index";
import { grapevineBackend } from "../../API";
import { userHook } from "../../Hooks";
import { AntDesign } from "@expo/vector-icons";
import { Explore } from "../../Components/index";
import { Notification } from "../../MoleculeComponents/index";
import { Search } from "../../AtomComponents/index";

const ExplorePage = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const { hasUser, setUserDetails } = userHook();
  const user = hasUser();
  const searchUser = async (name) => {
    console.log("name", name);
    grapevineBackend("/auth/search", { name: name }, "POST")
      .then(async ({ data }) => {
        setUsers([...data.data]); //TODO: Bipul only show profile of unblocked
        setShowUsers(true);
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

  return (
    <SignInLayout>
      <Box h="100%" w="100%">
        <ScrollView style={{ height: "100%" }}>
          <View h="100%">
            <View style={styles.searchContainer}>
              <Search onSearch={searchUser} />
            </View>
            <View>
              <Slide in={showUsers} height="100%" bg="#fff">
                <View flex={1} h="100%" w="100%" p={2} py={10}>
                  <Flex
                    flexDirection="row"
                    justifyContent={"flex-end"}
                    alignItems="center"
                  >
                    <Pressable onPress={() => setShowUsers(false)}>
                      <AntDesign name="closesquare" size={24} color="blue" />
                    </Pressable>
                  </Flex>
                  <View>
                    {users?.map((person) => {
                      return (
                        <Notification
                          onPress={() => {
                            setShowUsers(false);

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
              </Slide>
            </View>

            <View>
              <View style={styles.featureContainer}>
                <Explore.Features />
              </View>

              <View style={styles.collectionContainer}>
                <Explore.Collection />
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
