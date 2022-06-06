import React, { useEffect, useState, useContext } from "react";
import { Box, Center, Flex, Text, Image, View } from "native-base";
import { SignInLayout } from "../../Layout/index";
import NotificationContainer from "../../MoleculeComponents/Notifications/NotificationContainer";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { grapevineBackend } from "../../API";

const Activity = ({ navigation }) => {
  const [component, setComponent] = useState("foryou");
  const [forYouActicity, setForYouActivity] = useState([]);
  const [connectedcticity, setConnectedActivity] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend("/activity/get/foryou", {}, "POST")
        .then(async ({ data }) => {
          setError(false);
          if (data.status == true) {
            setForYouActivity([...data.data.result]);
          }
        })
        .catch((err) => {
          setError(true);
          console.log("Err", err);
        });
      grapevineBackend("/activity/get/connected", {}, "POST")
        .then(async ({ data }) => {
          setError(false);
          if (data.status == true) {
            setConnectedActivity([...data.data.result]);
          }
        })
        .catch((err) => {
          setError(true);
          console.log("Err", err);
        });
    });

    return unsubscribe;
  }, []);

  return (
    <SignInLayout>
      <Box h="100%" w="100%">
        <Flex
          direction="row"
          justifyContent="center"
          alignItems="center"
          m="20px"
        >
          <Pressable onPress={() => setComponent("foryou")}>
            <Text fontWeight={component == "foryou" ? "800" : "600"} mx={1}>
              For You
            </Text>
          </Pressable>
          <Pressable onPress={() => setComponent("connected")}>
            <Text fontWeight={component == "connected" ? "800" : "600"} mx={1}>
              Connected
            </Text>
          </Pressable>

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

        <Box h="100%" w="100%">
          {error ? (
            <Center h="100%" w="100%">
              <Text fontWeight={"800"}>Error occured</Text>
            </Center>
          ) : component == "connected" ? (
            <>
              {connectedcticity ? (
                <>
                  <Box pb="70" p={2}>
                    <NotificationContainer
                      time="New"
                      notifications={connectedcticity}
                    />
                  </Box>
                </>
              ) : (
                <Center h="100%" w="100%">
                  <ActivityIndicator size="small" color="#0000ff" />
                </Center>
              )}
            </>
          ) : (
            <>
              {forYouActicity ? (
                <>
                  {forYouActicity.length > 0 ? (
                    <Box pb="70" p={2}>
                      <NotificationContainer
                        time="New"
                        notifications={forYouActicity}
                      />
                    </Box>
                  ) : (
                    <Center h="100%" w="100%">
                      <Text>No Post To Show</Text>
                    </Center>
                  )}
                </>
              ) : (
                <Center h="100%" w="100%">
                  <ActivityIndicator size="small" color="#0000ff" />
                </Center>
              )}
            </>
          )}
        </Box>

        {/* 
        <Box pl="5%" pr="5%">
          <NotificationContainer time="New" notifications={data} />
          <NotificationContainer time="Yesterday" notifications={data} />
          <NotificationContainer time="This Week" notifications={data} />
        </Box> */}
      </Box>
    </SignInLayout>
  );
};

export default Activity;
