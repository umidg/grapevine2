import React, { useEffect, useState, useContext } from "react";
import { Box, View } from "native-base";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";

import { AtomComponents, Layout, PageComponent } from "../../Exports/index";

const Messages = ({ navigation }) => {
  const { Search } = AtomComponents;
  const {
    Message: { Header, Message },
  } = PageComponent;
  const { SignInLayout } = Layout;

  const [friends, setFriends] = useState([]);
  const [user, setUser] = useContext(UserValue);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend(
        "/friendship/getAllFriends",
        { user_uuid: user.uuid },
        "POST"
      )
        .then(async ({ data }) => {
          if (data.status) {
            setFriends([...data.data]);
          }
        })
        .catch((err) => console.log(err));
    });

    return unsubscribe;
  }, []);

  return (
    <SignInLayout>
      <Box h="100%" w="100%" pt="5">
        <Header goBack={() => navigation.goBack()} />
        <View pr="5%" pl="5%" mt="5">
          <Search />
        </View>

        <View>
          {friends.map((friend) => {
            return (
              <View key={friend.uuid}>
                <Message
                  username={friend.username}
                  onPress={() =>
                    navigation.navigate("Chatroom", {
                      friend_uuid: friend.user_uuid,
                      username: friend.username,
                      friendship_uuid: friend.friendship_uuid,
                      chatroom_uuid: friend.chatroom_uuid,
                      valid_room: friend.valid_room,
                    })
                  }
                />
              </View>
            );
          })}
        </View>
      </Box>
    </SignInLayout>
  );
};

export default Messages;
