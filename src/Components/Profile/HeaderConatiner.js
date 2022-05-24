import { Box, Text, Avatar, Divider, Button } from "native-base";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { grapevineBackend } from "../../API";
import { useState, useEffect, useContext } from "react";
import { UserValue } from "../../Context/UserContext";
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
      id,
      uuid,
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
          const friendShip = {
            id: data.data.id,
            type: data.data.type,
            accepted: data.data.accepted,
            blocked: data.data.blocked,
            blocked_by: data.data.blocked_by,
            friendId: data.data.user_accept,
            hasRequested: true,
          };
          setUser({
            ...user,
            ...user.friends.push(friendShip),
          });
          setFriend({ ...friendShip });
        } else {
          Alert.alert("", data.data.message);
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
        friendship_uuid: friend.id,
        user_accept: user.uuid,
      },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
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
        } else {
          Alert.alert("", "something went wrong");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    user?.friends.some((friend) => {
      if (friend.friendId === uuid) {
        setFriend({ ...friend });
        return true;
      }
    });
  }, [user]);

  return (
    <Box w="full" p="5">
      <Box flex="1" flexDir="row">
        <Box flex="0.30" alignSelf="center" justifyContent="center" mr="5">
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
          <Text textAlign="center">
            {/* TODO bipul  colors*/}
            {engagement_type == "User" ? "Creator" : "Brand"}
          </Text>
          <Text
            fontWeight="bold"
            italic
            fontSize="12"
            mt="2"
          >{`${fname} ${lname}`}</Text>
        </Box>
        <Box flex="0.70">
          <Text fontWeight="bold" mb="2">
            @{username}
          </Text>
          <Box flex="1" flexDir="row">
            <Box flexDir="column" alignItems="center">
              <Text italic fontSize="xl" fontWeight="bold">
                {posts?.length > 0 ? `${posts.length}` : "2K"}
              </Text>
              <Text italic fontWeight="bold" fontSize="10">
                Posts
              </Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text italic fontSize="xl" fontWeight="bold">
                {follwers ?? "4M"}
              </Text>
              <Text italic fontWeight="bold" fontSize="10">
                Followers
              </Text>
            </Box>
            <Divider h="8" bg="gray.200" orientation="vertical" m="auto" />
            <Box flexDir="column" alignItems="center">
              <Text italic fontSize="xl" fontWeight="bold">
                {connections ?? "100+"}
              </Text>
              <Text fontWeight="bold" italic fontSize="10">
                Connections
              </Text>
            </Box>
          </Box>
          <Box mt="2">
            <Text fontSize="10" fontWeight="bold" italic mb="1">
              Top 5.8% of all creators
            </Text>
            {user?.uuid != uuid && (
              <Box flexDir="row" justifyContent="space-between">
                {/* check if userId is in friends array */}
                {friend ? (
                  friend.accepted ? (
                    <Button
                      h="7"
                      pt="0"
                      pb="0"
                      bg="buttonPrimaryColor"
                      flex="0.45"
                    >
                      Friends
                    </Button>
                  ) : friend?.hasRequested ? (
                    <Button
                      h="7"
                      pt="0"
                      pb="0"
                      bg="buttonPrimaryColor"
                      flex="0.45"
                    >
                      Req Sent
                    </Button>
                  ) : (
                    <Button
                      h="7"
                      pt="0"
                      pb="0"
                      bg="buttonPrimaryColor"
                      flex="0.45"
                      onPress={acceptFriendRequest}
                    >
                      Accept
                    </Button>
                  )
                ) : (
                  <Button
                    onPress={() => sendRequest()} //TODO send request + edit userDetail
                    h="7"
                    pt="0"
                    pb="0"
                    bg="buttonPrimaryColor"
                    flex="0.45"
                  >
                    {user?.engagement_type == "User" &&
                    engagement_type == "User"
                      ? "Connect"
                      : "Collab"}
                  </Button>
                )}
                {friend?.accepted ? (
                  <Button
                    onPress={() =>
                      navigation.navigate("Chatroom", {
                        friend_uuid: uuid,
                        username: username,
                        friendship_uuid: friend.uuid,
                      })
                    }
                    h="7"
                    pt="0"
                    pb="0"
                    bg="buttonPrimaryColor"
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
                    bg="buttonPrimaryColor"
                    flex="0.45"
                  >
                    Message
                  </Button>
                )}

                <Feather name="more-vertical" size={24} color="black" />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <Text fontSize="12" color="gray.500" italic pt="2">
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
