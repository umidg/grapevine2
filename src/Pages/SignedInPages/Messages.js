import React, { useEffect, useState, useContext } from "react";
import { Box, ScrollView, Spinner, View } from "native-base";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
import { AtomComponents, Layout, PageComponent } from "../../Exports/index";
import GetAllChatroom from "../../Hooks/Chatroom/getAllChatroom";

const Messages = ({ navigation }) => {
  const { Search } = AtomComponents;
  const {
    Message: { Header, Message },
  } = PageComponent;
  const { SignInLayout } = Layout;

  const [showChatrooms, setShowChatrooms] = useState([]);
  const [user, setUser] = useContext(UserValue);

  const chatrooms = GetAllChatroom(user.uuid);

  const filterUser = (text) => {
    // let searchText = text.toLowerCase();
    // setShowChatrooms(
    //   chatrooms.filter(
    //     (room) => room.user[0].username.toLowerCase().indexOf(searchText) == 0
    //   )
    // );
  };
  const onScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      chatrooms.fetchNextPage();
    }
  };

  if (chatrooms.isLoading) {
    return <Spinner />;
  }
  return (
    <SignInLayout>
      <Box h="100%" w="100%" pt="5">
        <Header goBack={() => navigation.goBack()} />
        <View pr="5%" pl="5%" mt="5">
          <Search onSearch={filterUser} />
        </View>

        <View>
          {chatrooms.isError || chatrooms.data?.pages[0]?.length < 1 ? (
            <></>
          ) : (
            <ScrollView
              onScroll={({ nativeEvent }) => {
                onScroll(nativeEvent);
              }}
            >
              {chatrooms.data?.pages.map((page) =>
                page.result.map((room, index) => {
                  return (
                    <View key={room.uuid}>
                      <Message
                        username={room.name ? room.name : room.user[0].username}
                        onPress={() =>
                          navigation.navigate("Chatroom", {
                            username: room.name
                              ? room.name
                              : room.user[0].username,
                            chatroom_uuid: room.uuid,
                            valid_room: room.valid_room,
                          })
                        }
                      />
                    </View>
                  );
                })
              )}
            </ScrollView>
          )}
        </View>
      </Box>
    </SignInLayout>
  );
};

export default Messages;
