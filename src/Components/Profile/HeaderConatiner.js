import { Box, Text, Avatar, Divider, Button } from "native-base";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { grapevineBackend } from "../../API";
import { useState, useEffect, useContext } from "react";
import { UserValue } from "../../Context/UserContext";
import { useMemo } from "react";
const HeaderContainer = (props) => {
  const [user, setUser] = useContext(UserValue);
  const [friend, setFriend] = useState(null);
  const {
    user: {
      username,
      image,
      posts,
      follwers,
      connections,
      engagement_type,
      fname,
      lname,
      uuid,
      friendship_status,
    },
    navigation,
  } = props;

  const sendRequest = async () => {
    grapevineBackend(
      "/friendship/sendfriendrequest",
      {
        user_request: user.uuid,
        user_accept: uuid,
      },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
          setFriend({
            friendship_uuid: data.data.uuid,
            status: "pending",
            action: "wait",
          });
        } else {
          Alert.alert("", data.message);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const acceptFriendRequest = async () => {
    grapevineBackend(
      "/friendship/acceptfriendrequest",
      {
        friendship_uuid: friend.friendship_uuid,
        user_accept: user.uuid,
      },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
          setFriend({
            ...friend,
            status: "accepted",
            action: "none",
          });
        } else {
          Alert.alert("", "something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (friendship_status) {
      if (friendship_status.accepted) {
        setFriend({
          friendship_uuid: friendship_status.uuid,
          status: "accepted",
          action: "none",
        });
      } else {
        if (friendship_status.user_accept == user.uuid) {
          setFriend({
            friendship_uuid: friendship_status.uuid,
            status: "pending",
            action: "accept",
          });
        } else {
          setFriend({
            friendship_uuid: friendship_status.uuid,
            status: "pending",
            action: "wait",
          });
        }
      }
    }
  }, [friendship_status]);

  return (
    <Box w="full" p="5">
      <Box flex="1" flexDir="row">
        <Box
          alignSelf="center"
          justifyContent="center"
          mr="5"
          alignContent="center"
        >
          <Avatar
            alignSelf="center"
            justifyContent="center"
            source={{
              uri: image
                ? image
                : "https://wallpaperaccess.com/full/317501.jpg",
            }}
            size="20"
          />
          <Text
            textAlign="center"
            bg="primary"
            color="#fff"
            borderRadius={"md"}
            mt="2"
          >
            {/* TODO bipul  colors*/}
            {engagement_type == "User" ? "Creator" : "Brand"}{" "}
            <AntDesign name="check" size={12} color="white" />
          </Text>
          <Text
            fontWeight="bold"
            fontSize="12"
            mt="2"
            textAlign="center"
          >{`${fname} ${lname}`}</Text>
        </Box>
        <Box flex="0.70">
          <Text fontWeight="bold" mb="2">
            @{username}
          </Text>
          <Box flex="1" flexDir="row">
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {posts?.length > 0 ? `${posts.length}` : "2K"}
              </Text>
              <Text fontSize="10">Posts</Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {follwers ?? "4M"}
              </Text>
              <Text fontSize="10">Followers</Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                {connections ?? "100+"}
              </Text>
              <Text fontSize="10">Connections</Text>
            </Box>
          </Box>
          <Box mt="2">
            <Text fontSize="10" fontWeight="bold" mb="1">
              Top 5.8% of all creators
            </Text>

            <Box flexDir="row" justifyContent="space-between">
              {/* check if userId is in friends array */}
              {friend ? (
                friend.status == "accepted" ? (
                  <Button h="7" pt="0" pb="0" bg="primary" flex="0.45">
                    Friends
                  </Button>
                ) : friend.action == "accept" ? (
                  <Button
                    h="7"
                    pt="0"
                    pb="0"
                    bg="primary"
                    flex="0.45"
                    onPress={acceptFriendRequest}
                  >
                    Accept
                  </Button>
                ) : (
                  <Button h="7" pt="0" pb="0" bg="primary" flex="0.45">
                    Req Sent
                  </Button>
                )
              ) : (
                <Button
                  onPress={() => sendRequest()} //TODO send request + edit userDetail
                  h="7"
                  pt="0"
                  pb="0"
                  bg="primary"
                  flex="0.45"
                >
                  Connect
                </Button>
              )}
              {friendship_status?.chatroom ? (
                <Button
                  onPress={() =>
                    navigation.navigate("Chatroom", {
                      friend_uuid: uuid,
                      username: username,
                      friendship_uuid: friend.uuid,
                      chatroom_uuid: friendship_status.chatroom.uuid,
                      valid_room: friendship_status.chatroom.valid_room,
                    })
                  }
                  h="7"
                  pt="0"
                  pb="0"
                  bg="primary"
                  flex="0.45"
                >
                  Message
                </Button>
              ) : (
                <Button
                  onPress={() =>
                    Alert.alert("", "You need to be friend to send message")
                  }
                  h="7"
                  pt="0"
                  pb="0"
                  bg="primary"
                  flex="0.45"
                >
                  Message
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box>
        <Text fontSize="12" color="gray.500" pt="2">
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industrycenturies, but also the leap into
          electronic typesetting, has been the industrycenturies, but als has
          been the industrycenrem …more
        </Text>
      </Box>
    </Box>
  );
};

export default HeaderContainer;
