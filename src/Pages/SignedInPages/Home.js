import React, { useState, useEffect, useContext } from "react";
import { Box, Center, Text, Flex, Pressable, Image } from "native-base";
import PostV2 from "../../MoleculeComponents/Post/PostV2";
import LayoutFrame from "../../Layout/LayoutFrame";
import { ActivityIndicator } from "react-native";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
import TiktokPost from "../../MoleculeComponents/Post/TiktokPost";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const Home = ({ navigation }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(false);
  const [user, setUser] = useContext(UserValue);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend("/post/getAllPost", {}, "POST")
        .then(async ({ data }) => {
          if (data.status == true) {
            setPost([...data.data]);
          }
        })
        .catch((err) => {
          console.log("Err", err);
          setError(true);
        });
    });

    return unsubscribe;
  }, []);
  return (
    <LayoutFrame>
      <Box h="100%" w="100%">
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p="5"
          h="70"
          w="100%"
          borderBottomWidth={0.5}
          borderBottomColor="#d3d3d3"
        >
          <Pressable>
            <Image
              source={require("../../../assets/Logo/grapevine.png")}
              alt="logo"
              w={98}
              h={5}
            />
          </Pressable>
          <Flex
            direction="row"
            alignItems={"center"}
            justifyContent="center"
            position="absolute"
            right="10px"
          >
            <Pressable
              onPress={() => navigation.navigate("Notification")}
              mx={2}
            >
              <Ionicons name="notifications-outline" color="#000" size={26} />
            </Pressable>
            <Pressable onPress={() => navigation.navigate("Messages")}>
              <FontAwesome5 name="location-arrow" color="#000" size={22} />
            </Pressable>
          </Flex>
        </Flex>
        {error ? (
          <Center h="100%" w="100%">
            <Text fontWeight={"800"}>Error occured</Text>
          </Center>
        ) : post ? (
          <>
            <Box pb="70" p={2}>
              {post.map((d) => {
                if (d.post_type == "text") {
                  return (
                    <PostV2
                      key={d.id}
                      data={d}
                      user={user}
                      navigation={navigation}
                    />
                  );
                } else if ((d.post_type = "tiktok")) {
                  return (
                    <TiktokPost
                      data={d}
                      key={d.id}
                      user={user}
                      navigation={navigation}
                    />
                  );
                }
              })}
            </Box>
          </>
        ) : (
          <Center h="100%" w="100%">
            <ActivityIndicator size="small" color="#0000ff" />
          </Center>
        )}
      </Box>
    </LayoutFrame>
  );
};

export default Home;
