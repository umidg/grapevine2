import React, { useState, useEffect, useContext } from "react";
import { Box, Center, Text, Flex, Pressable, Image } from "native-base";
import { SignInLayout } from "../../Layout/index";
import { ActivityIndicator } from "react-native";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
import { LinearGradient } from "expo-linear-gradient";

import { PostContainer } from "../../MoleculeComponents/index";

const Home = ({ navigation }) => {
  const [post, setPost] = useState(null);
  const [postType, setPostType] = useState("connected");
  const [error, setError] = useState(false);
  const [user, setUser] = useContext(UserValue);
  const [forYouPost, setForYouPost] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      grapevineBackend("/post/getAllPost?page=1&limit=10", {}, "POST")
        .then(async ({ data }) => {
          setError(false);
          if (data.status == true) {
            setPost([...data.data.result]);
          }
        })
        .catch((err) => {
          console.log("Err", err);
          setError(true);
        });
      grapevineBackend("/post/forYouPost", {}, "POST")
        .then(async ({ data }) => {
          setError(false);
          if (data.status == true) {
            setForYouPost([...data.data.result]);
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
    <Box h="100%" w="100%">
      <LinearGradient
        colors={[
          "rgba(255,255,255,0.9)",
          "rgba(255,255,255,0.9)",
          "rgba(255,255,255,0)",
          "transparent",
        ]}
        style={{
          height: 100,
          width: "100%",
          position: "absolute",
          zIndex: 1000,
          // backgroundColor: "red",
        }}
      />
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        p="5"
        h="70"
        w="100%"
        zIndex={2000}
        position={"absolute"}
      >
        <Pressable onPress={() => setPostType("foryou")}>
          <Text fontWeight={postType == "foryou" ? "800" : "600"} mx={1}>
            For You
          </Text>
        </Pressable>
        <Pressable onPress={() => setPostType("connected")}>
          <Text fontWeight={postType == "connected" ? "800" : "600"} mx={1}>
            Connected
          </Text>
        </Pressable>
      </Flex>
      <SignInLayout>
        <Box h="100%" w="100%" mt={20}>
          {/* <Flex
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
        </Flex> */}
          {error ? (
            <Center h="100%" w="100%">
              <Text fontWeight={"800"}>Error occured</Text>
            </Center>
          ) : postType == "connected" ? (
            <>
              {post ? (
                <>
                  <Box pb="70" p={2} mt={35}>
                    {post.map((d) => {
                      return (
                        <PostContainer
                          post={d}
                          key={d.uuid}
                          user={user}
                          navigation={navigation}
                        />
                      );
                    })}
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
              {forYouPost ? (
                <>
                  {forYouPost.length > 0 ? (
                    <Box pb="70" p={2}>
                      {forYouPost.map((d) => {
                        return (
                          <PostContainer
                            post={d}
                            key={d.uuid}
                            user={user}
                            navigation={navigation}
                          />
                        );
                      })}
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
      </SignInLayout>
    </Box>
  );
};

export default Home;
