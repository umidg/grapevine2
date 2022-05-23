import React from "react";
import {
  View,
  Text,
  Box,
  FlatList,
  Center,
  ScrollView,
  Flex,
} from "native-base";
import Notification from "../../../MoleculeComponents/Notifications/Notification";
const ProfileInfo = () => {
  const data = [1, 2, 3, 4];

  return (
    <Box w="100%" p="5">
      <Text fontWeight="800" fontSize="14" textAlign="left">
        Vouches
      </Text>
      <Center>
        <Flex direction="row">
          <Box m="5">
            <Text fontWeight="800" fontSize="18" textAlign="center">
              86
            </Text>
            <Text fontWeight="800" fontSize="14" textAlign="center">
              Received
            </Text>
          </Box>
          <Box m="5">
            <Text fontWeight="800" fontSize="18" textAlign="center">
              21
            </Text>
            <Text fontWeight="800" fontSize="14" textAlign="center">
              Given
            </Text>
          </Box>
        </Flex>
      </Center>
      <Center w="80%" bg="theme.bg">
        <Box w="100%" h="100%">
          {data.map((d) => {
            return (
              <Notification
                key={d}
                profileImage={require("../../../../assets/Images/3.png")}
                message={
                  "Molly May is an extremely reliable creator with an amazing sense of style and creativ… see more"
                }
                // time="2h"
                username="@molleymae"
              />
            );
          })}
        </Box>
      </Center>
    </Box>
  );
};

export default ProfileInfo;
