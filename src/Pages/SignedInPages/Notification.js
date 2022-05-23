import React, { useEffect, useState, useContext } from "react";
import { Box, Center, Flex, Text, Image } from "native-base";
import LayoutFrame from "../../Layout/LayoutFrame";
import NotificationContainer from "../../MoleculeComponents/Notifications/NotificationContainer";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
const NotificationPage = ({ navigation }) => {
  // const [friendRequest, setFriendRequest] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [user, setUser] = useContext(UserValue);
  // const [friends, setFrineds] = useState([]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener("focus", () => {
  //     grapevineBackend(
  //       "/friendship/getfriendrequest",
  //       { user_accept: user.id },
  //       "POST"
  //     )
  //       .then(async ({ data }) => {
  //         if (data.code == 200) {
  //           setFriendRequest([...data.data]);
  //         } else {
  //           console.log("Err: Friend Request", data);
  //         }
  //       })
  //       .catch((err) => console.log(err));

  //     grapevineBackend("/auth/getallusers", { user_id: user.id }, "POST")
  //       .then(async ({ data }) => {
  //         if (data.code == 200) {
  //           setUsers([...data.data]);
  //         } else {
  //           console.log("Err:All users", data);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //     grapevineBackend(
  //       "/friendship/getAllFriends",
  //       { user_id: user.id },
  //       "POST"
  //     )
  //       .then(async ({ data }) => {
  //         if (data.code == 200) {
  //           setFrineds([...data.data]);
  //         } else {
  //           console.log("Err:All friends", data);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   });

  //   return unsubscribe;
  // }, []);

  return (
    <LayoutFrame>
      <Box h="100%" w="100%">
        {/* <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          m="20px"
        >
          <Text
            fontSize="15px"
            fontWeight="800"
            pr="2px"
            flex={1}
            textAlign="right"
          >
            Activity
          </Text>

          <Box w="1px" h="70%" m="5px" bg="red.500"></Box>
          <Text fontSize="15px" pl="2px" flex={1} textAlign="left">
            Notification
          </Text>
          <Box position="absolute" right="10px">
            <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
              <Image
                source={require("../../../assets/Icons/Pointer.png")}
                h="20px"
                w="20px"
                alt="pointer"
              />
            </TouchableOpacity>
          </Box>
        </Flex> */}
        <Box
          flexDirection={"row"}
          justifyContent="center"
          alignItems={"center"}
          mt="20px"
          pt={3}
          pb={3}
          pl={5}
          pr={5}
        >
          <Pressable
            onPress={() => navigation.goBack()}
            position="absolute"
            left={10}
          >
            <AntDesign
              name="arrowleft"
              size={30}
              color="black"
              onPress={() => navigation.pop()}
            />
          </Pressable>

          <Text
            fontSize="18px"
            fontWeight="800"
            pr="2px"
            color="#000"
            textAlign={"center"}
          >
            Notification
          </Text>
        </Box>
        <Pressable onPress={() => navigation.navigate("FriendRequest")}>
          <Flex
            flexDirection={"row"}
            justifyContent="space-between"
            alignItems={"center"}
            mb="20px"
            bg="#3d368218"
            // opacity={0.1}
            pt={3}
            pb={3}
            pl={5}
            pr={5}
          >
            <Text fontSize="15px" fontWeight="800" pr="2px" color="#000">
              Connection Requests
            </Text>

            <AntDesign name="caretright" size={18} color="#000" p="2" />
          </Flex>
        </Pressable>

        <Box pl="5%" pr="5%">
          <NotificationContainer time="New" />
          <NotificationContainer time="Yesterday" />
          <NotificationContainer time="This Week" />
        </Box>
      </Box>
    </LayoutFrame>
  );
};

export default NotificationPage;
