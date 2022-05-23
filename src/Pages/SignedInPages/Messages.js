import React, { useEffect, useState, useContext } from "react";
import { Box, View, Center, Text, Pressable } from "native-base";
import LayoutFrame from "../../Layout/LayoutFrame";
import Header from "../../Components/Messages/Header/Header";
import Search from "../../AtomComponents/Input/Search";
import Message from "../../Components/Messages/Message/Message";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
const Messages = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useContext(UserValue);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend(
        "/friendship/getAllFriends",
        { user_id: user.id },
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
    <LayoutFrame>
      <Box h="100%" w="100%" pt="5">
        <Header goBack={() => navigation.goBack()} />
        <View pr="5%" pl="5%" mt="5">
          <Search />
        </View>

        <View>
          {friends.map((d) => {
            return (
              <View key={d.friendship_id}>
                <Message
                  username={d.username}
                  onPress={() =>
                    navigation.navigate("Chatroom", {
                      friend_id: d.user_id,
                      username: d.username,
                      friendship_id: d.friendship_id,
                    })
                  }
                />
              </View>
            );
          })}
        </View>
      </Box>
    </LayoutFrame>
  );
};

export default Messages;
