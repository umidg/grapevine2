import React, { useState, useEffect, useContext } from "react";
import { Box, Center, Text, Flex, Pressable, Image } from "native-base";
import { UserValue } from "../../Context/UserContext";
import { LinearGradient } from "expo-linear-gradient";

import {
  MolecularComponents,
  Layout,
  PageComponent,
} from "../../Exports/index";
import { grapevineBackend } from "../../API";
const Home = ({ navigation }) => {
  const { SignInLayout } = Layout;
  const {
    Home: { ConnectedPosts, ForYouPost },
  } = PageComponent;
  const [postType, setPostType] = useState("connected");
  const [error, setError] = useState(false);
  const [user, setUser] = useContext(UserValue);
  const [forYouPosts, setForYouPosts] = useState([]);
  const [connectedPosts, setConnectedPosts] = useState([]);
  const [connectedPostApiParams, setConnectedPostApiParams] = useState({
    page: 1,
    limit: 5,
  });
  const [forYouPostApiParams, setForYouPostApiParams] = useState({
    page: 1,
    limit: 5,
  });

  const fetchConnectedPosts = () => {
    if (connectedPostApiParams) {
      grapevineBackend(
        `/post/connectedPost?page=${connectedPostApiParams.page}&limit=${connectedPostApiParams.limit}`,
        {},
        "POST"
      )
        .then(async ({ data }) => {
          setError(false);
          if (data.status == true && data.data.result.length > 0) {
            setConnectedPostApiParams({ ...data.data.next });
            setConnectedPosts([...connectedPosts, ...data.data.result]);
          }
        })
        .catch((err) => {
          console.log(err, "err");
          setError(true);
        });
    }
  };

  const fetchForYouPosts = () => {
    if (forYouPostApiParams) {
      grapevineBackend(
        `/post/forYouPost?page=${forYouPostApiParams.page}&limit=${forYouPostApiParams.limit}`,
        {},
        "POST"
      )
        .then(async ({ data }) => {
          if (data.status == true) {
            setError(false);
            setForYouPostApiParams({ ...data.data.next });
            setForYouPosts([...forYouPosts, ...data.data.result]);
          }
        })
        .catch((err) => {
          setError(true);
        });
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchConnectedPosts();
      fetchForYouPosts();
    });

    return unsubscribe;
  }, []);

  return (
    <Box h="100%" w="100%">
      <LinearGradient
        colors={[
          "rgba(255,255,255,1)",
          "rgba(255,255,255,0.9)",
          "rgba(255,255,255,0)",
          "transparent",
        ]}
        style={{
          height: 100,
          width: "100%",
          position: "absolute",
          zIndex: 300,
        }}
      />
      <Flex
        direction="row"
        justifyContent="center"
        alignItems="center"
        h="70"
        w="100%"
        top={0}
        zIndex={400}
        position="absolute"
      >
        <Pressable onPress={() => setPostType("foryou")}>
          <Text
            fontWeight={postType == "foryou" ? "800" : "400"}
            mx={1}
            shadow="1"
          >
            For You
          </Text>
        </Pressable>
        <Text>|</Text>
        <Pressable onPress={() => setPostType("connected")}>
          <Text
            fontWeight={postType == "connected" ? "800" : "400"}
            mx={1}
            shadow="1"
          >
            Connected
          </Text>
        </Pressable>
      </Flex>
      <Box h="100%" w="100%" mt="5" bg="white">
        {error ? (
          <Center h="100%" w="100%">
            <Text fontWeight={"800"}>Error occured</Text>
          </Center>
        ) : postType == "connected" ? (
          <ConnectedPosts
            user={user}
            navigation={navigation}
            connectedPosts={connectedPosts}
            loadNextPage={fetchConnectedPosts}
          />
        ) : (
          <ForYouPost
            user={user}
            navigation={navigation}
            forYouPosts={forYouPosts}
            loadNextPage={fetchForYouPosts}
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
