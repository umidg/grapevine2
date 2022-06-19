import React, { useEffect, useState } from "react";
import { Box, Center, Flex, ScrollView, Text } from "native-base";
import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { Pressable, TouchableOpacity } from "react-native";
import { grapevineBackend } from "../../API";
import { MolecularComponents, Layout } from "../../Exports/index";
const ActivityPage = ({ navigation }) => {
  const { NotificationContainer, Activity } = MolecularComponents;
  const { SignInLayout } = Layout;

  const [component, setComponent] = useState("foryou");
  const [forYouActicity, setForYouActivity] = useState([]);
  const [connectedcticity, setConnectedActivity] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend("/activity/get/foryou", {}, "POST")
        .then(async ({ data }) => {
          console.log(data.data.result, "data");
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
    <Box h="100%" w="100%" bg="white">
      <Box>
        <Text fontWeight="800" fontSize={16} textAlign="center">
          Activity
        </Text>
        <Flex
          direction="row"
          alignItems="center"
          justifyContent="center"
          position="absolute"
          right="5"
        >
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Ionicons name="notifications-outline" color="black" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Messages")}>
            <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
        </Flex>
      </Box>

      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        m="20px"
      >
        <Pressable onPress={() => setComponent("foryou")}>
          <Text
            fontWeight={component == "foryou" ? "800" : "400"}
            mx={1}
            shadow="1"
          >
            For You
          </Text>
        </Pressable>
        <Text>|</Text>
        <Pressable onPress={() => setComponent("connected")}>
          <Text
            fontWeight={component == "connected" ? "800" : "400"}
            mx={1}
            shadow="1"
          >
            Connected
          </Text>
        </Pressable>
      </Flex>

      <ScrollView>
        <Box h="100%" w="100%">
          {error ? (
            <Center h="100%" w="100%">
              <Text fontWeight={"800"}>Error occured</Text>
            </Center>
          ) : component == "connected" ? (
            <>
              {connectedcticity ? (
                <Box pb="70" p={2}>
                  {connectedcticity.map((activity) => (
                    <Activity
                      activity={activity}
                      navigation={navigation}
                      key={activity.uuid}
                    />
                  ))}
                </Box>
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
                      {forYouActicity.map((activity) => (
                        <Activity
                          activity={activity}
                          navigation={navigation}
                          key={activity.uuid}
                        />
                      ))}
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
      </ScrollView>
    </Box>
  );
};

export default ActivityPage;
