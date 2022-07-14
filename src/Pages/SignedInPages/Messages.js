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

  const [chatrooms, setChatrooms] = useState([]);
  const [showChatrooms, setShowChatrooms] = useState([]);
  const [user, setUser] = useContext(UserValue);

  const filterUser = (text) => {
    let searchText = text.toLowerCase();
    setShowChatrooms(
      chatrooms.filter(
        (room) => room.user[0].username.toLowerCase().indexOf(searchText) == 0
      )
    );
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend("/user/getAllChatRoom", { user_uuid: user.uuid }, "POST")
        .then(async ({ data }) => {
          if (data.status) {
            setChatrooms([...data.data]);
            setShowChatrooms([...data.data]);
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
          <Search onSearch={filterUser} />
        </View>

        <View>
          {showChatrooms.map((room) => {
            return (
              <View key={room.uuid}>
                <Message
                  username={room.name ? room.name : room.user[0].username}
                  onPress={() =>
                    navigation.navigate("Chatroom", {
                      username: room.name ? room.name : room.user[0].username,
                      chatroom_uuid: room.uuid,
                      valid_room: room.valid_room,
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
