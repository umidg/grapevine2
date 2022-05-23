import React, { useEffect, useState, useContext } from "react";
import { Box, Center, Flex, Text, Image, View } from "native-base";
import LayoutFrame from "../../Layout/LayoutFrame";
import NotificationContainer from "../../MoleculeComponents/Notifications/NotificationContainer";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";

const data = [
  {
    id: "id",
    uuid: "uuid",
    message: "umid posted new photo.",
    post_uuid: "Post_uuid",
    user_uuid: "user_uuid",
    created_at: "created_at",
    updated_at: "updated_at",
  },
  {
    id: "id",
    uuid: "uuid",
    message: "umid posted new photo.",
    post_uuid: "Post_uuid",
    user_uuid: "user_uuid",
    created_at: "created_at",
    updated_at: "updated_at",
  },
  {
    id: "id",
    uuid: "uuid",
    message: "umid posted new photo.",
    post_uuid: "Post_uuid",
    user_uuid: "user_uuid",
    created_at: "created_at",
    updated_at: "updated_at",
  },
];

const Activity = ({ navigation }) => {
  const [component, setComponent] = useState("you");
  return (
    <LayoutFrame>
      <Box h="100%" w="100%">
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          m="20px"
        >
          <Text
            fontSize="15px"
            fontWeight={component == "you" ? "800" : "400"}
            pr="2px"
            flex={1}
            textAlign="right"
          >
            For You
          </Text>

          <Box w="1px" h="70%" m="5px" bg="red.500"></Box>

          <Text
            fontSize="15px"
            pl="2px"
            flex={1}
            textAlign="left"
            fontWeight={component == "you" ? "400" : "800"}
          >
            Connected
            {/* <Box
              h={1}
              w={1}
              borderRadius="full"
              bg="buttonPrimaryColor"
              //   zIndex={1000}
              position="absolute"
              top={1000}
            ></Box> */}
          </Text>

          <Flex
            direction="row"
            alignItems={"center"}
            justifyContent="center"
            position="absolute"
            right="10px"
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
            >
              <Ionicons name="notifications-outline" color="#000" size={26} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
              <FontAwesome5 name="location-arrow" color="#000" size={22} />
            </TouchableOpacity>
          </Flex>
        </Flex>

        <Box pl="5%" pr="5%">
          <NotificationContainer time="New" notifications={data} />
          <NotificationContainer time="Yesterday" notifications={data} />
          <NotificationContainer time="This Week" notifications={data} />
        </Box>
      </Box>
    </LayoutFrame>
  );
};

export default Activity;
