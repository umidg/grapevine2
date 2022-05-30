import React, { useEffect, useState, useContext } from "react";
import { Box, Center, Flex, Text, Image } from "native-base";
import LayoutFrame from "../../Layout/LayoutFrame";
import NotificationContainer from "../../MoleculeComponents/Notifications/NotificationContainer";
import { AntDesign } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
const NotificationPage = ({ navigation }) => {
  const [user, setUser] = useContext(UserValue);
  const [notifications, setnotification] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend("/notification/get", {}, "POST")
        .then(async ({ data }) => {
          if (data.code == 200) {
            setnotification([...data.data.result]);
          } else {
            console.log("Err: Friend Request", data);
          }
        })
        .catch((err) => console.log("err", err.message));
    });
    return unsubscribe;
  }, []);
  return (
    <LayoutFrame>
      <Box h="100%" w="100%">
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
          {notifications?.length > 0 ? (
            <NotificationContainer time="New" notifications={notifications} />
          ) : (
            <Text>No Notification</Text>
          )}
          {/* <NotificationContainer time="Yesterday" />
          <NotificationContainer time="This Week" /> */}
        </Box>
      </Box>
    </LayoutFrame>
  );
};

export default NotificationPage;
