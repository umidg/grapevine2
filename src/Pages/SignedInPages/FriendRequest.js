import { View, Text, Box, Flex, Center, Button } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { ScrollView } from "react-native";
import LayoutFrame from "../../Layout/LayoutFrame";
import { AntDesign } from "@expo/vector-icons";
import { Pressable } from "react-native";
import Search from "../../AtomComponents/Input/Search";
import Notification from "../../MoleculeComponents/Notifications/Notification";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
import LoadingMessageModal from "../../Modal/LoadingMessageModal";
import Box1 from "../../MoleculeComponents/ExploreBox/Box1";
const data = [1, 3, 4, 6];
const FriendRequest = ({ navigation }) => {
  const [friendRequest, setFriendRequest] = useState([]);
  const [user, setUser] = useContext(UserValue);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const acceptRequest = (id) => {
    setShowModal(true);
    grapevineBackend(
      "/friendship/acceptfriendrequest",
      { friendship_uuid: id, user_accept: user.uuid },
      "POST"
    )
      .then(async ({ data }) => {
        setModalMessage(data.message);
      })
      .catch((err) => {
        setModalMessage("Something Went Wrong");
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
  }, []);
  return (
    <LayoutFrame>
      <Box w="100%" h="100%" alignItems={"center"}>
        <Flex
          direction="row"
          justifyContent={"center"}
          alignItems="center"
          w="100%"
          mt={5}
          mb={5}
        >
          <LoadingMessageModal
            showModal={showModal}
            setShowModal={setShowModal}
            title="Friend Request"
            message={modalMessage}
            setMessage={setModalMessage}
          />
          <View
            position={"absolute"}
            left={5}
            h="100%"
            justifyContent={"center"}
          >
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign
                name="arrowleft"
                size={30}
                color="black"
                onPress={() => navigation.pop()}
              />
            </Pressable>
          </View>
          <Text fontWeight={"800"} color="#000" fontSize={22}>
            Connection Requests
          </Text>
        </Flex>
        <View w="80%">
          <Search />
        </View>
        <View mt={5} w="90%">
          {friendRequest.length > 0 ? (
            friendRequest.map((d) => (
              <Notification
                key={d.id}
                profileImage={require("../../../assets/Images/1.png")}
                message={"Sent You Friend Request"}
                time="2h"
                username={d.username}
                component={
                  <Center>
                    <Button
                      onPress={() => acceptRequest(d.uuid)}
                      h="7"
                      pt="0"
                      pb="0"
                      bg="buttonPrimaryColor"
                    >
                      Accept
                    </Button>
                  </Center>
                }
              />
            ))
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
      </Box>
    </LayoutFrame>
  );
};

export default FriendRequest;
