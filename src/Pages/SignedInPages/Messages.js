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
          setFriends([...data.data]);
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
          {friends.map((d) => {
            return (
              <View key={d.uuid}>
                <Message
                  username={d.username}
                  onPress={() =>
                    navigation.navigate("Chatroom", {
                      friend_uuid: d.user_uuid,
                      username: d.username,
                      friendship_uuid: d.friendship_uuid,
                      chatroom_uuid: d.chatroom_uuid,
                      valid_room: d.valid_room,
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
