import { View, Text, Box, Flex, Center, Button, Pressable } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
import Toast from "react-native-root-toast";

import {
  AtomComponents,
  MolecularComponents,
  Modal,
  Layout,
} from "../../Exports/index";
const data = [1, 3, 4, 6];
const FriendRequest = ({ navigation }) => {
  const { Box1 } = MolecularComponents;
  const { Search, RoundImage } = AtomComponents;
  const { LoadingMessageModal } = Modal;
  const { SignInLayout, BackLayout } = Layout;

  const [friendRequest, setFriendRequest] = useState([]);
  const [user, setUser] = useContext(UserValue);

  const acceptRequest = (uuid) => {
    grapevineBackend(
      "/friendship/acceptfriendrequest",
      { friendship_uuid: uuid, user_accept: user.uuid },
      "POST"
    )
      .then(async ({ data }) => {
        const updatedFriends = user?.friends.map((friend, i) => {
          if (friend.uuid === data.data.uuid) {
            let f = friend;
            f.accepted = true;
            setFriend({ ...f });

            return f;
          } else {
            return friend;
          }
        });
        setUser({
          ...user,
          friends: [...updatedFriends],
        });
        Toast.show("Accepted Friend Request", {
          duration: Toast.durations.SHORT,
        });
      })
      .catch((err) => {
        Toast.show("Something Went Wrong", {
          duration: Toast.durations.SHORT,
        });
        console.log(err);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend(
        "/friendship/getfriendrequest",
        { user_accept: user.uuid },
        "POST"
      )
        .then(async ({ data }) => {
          if (data.code == 200) {
            console.log(data.data);
            setFriendRequest([...data.data]);
          } else {
            console.log("Err: Friend Request", data);
          }
        })
        .catch((err) => console.log(err));
    });
    return unsubscribe;
  }, []);
  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box w="100%" h="100%" alignItems={"center"} bg="#fff">
        <Text fontWeight="800" fontSize={16} textAlign="center" mb="5">
          Connection Requests
        </Text>

        <SignInLayout>
          <View px={10}>
            <Search />
          </View>
          <View mt={5} w="90%">
            {friendRequest.length > 0 ? (
              friendRequest.map((friend_request) => {
                return (
                  <Box key={friend_request.uuid} px={5}>
                    <Flex
                      direction="row"
                      justifyContent={"space-between"}
                      alignItems="center"
                    >
                      <Flex
                        direction="row"
                        justifyContent={"flex-start"}
                        alignItems="center"
                      >
                        <RoundImage
                          image={require("../../../assets/Images/1.png")}
                          size={8}
                        />
                        <Text fontSize={18} fontWeight="600" ml={2}>
                          {"@" + friend_request.username}
                        </Text>
                      </Flex>
                      <Button
                        onPress={() => acceptRequest(friend_request.uuid)}
                        h="7"
                        pt="0"
                        pb="0"
                        bg="primary"
                      >
                        Accept
                      </Button>
                    </Flex>
                  </Box>
                );
              })
            ) : (
              <Text textAlign={"center"}>No friendRequest</Text>
            )}
          </View>
          <View w="100%" mt={5}>
            <Text fontWeight={"800"} fontSize="32" textAlign={"left"} ml={3}>
              Suggested
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.map((d) => (
                //   <Box1 key={d} />
                <Box1 key={d} />
              ))}
            </ScrollView>
          </View>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default FriendRequest;
