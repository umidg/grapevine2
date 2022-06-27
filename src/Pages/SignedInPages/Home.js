import React, { useState, useEffect, useContext } from "react";
import { Box, Center, Text, Flex, Pressable, Image } from "native-base";
import { UserValue } from "../../Context/UserContext";
import { Posts } from "../../Context/PostContext";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { Layout, PageComponent } from "../../Exports/index";
const Home = ({ navigation }) => {
  const {
    Home: { ConnectedPosts, ForYouPost },
  } = PageComponent;
  const [user, setUser] = useContext(UserValue);
  const { forYouPosts, connectedPosts } = useContext(Posts);
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "first",
      title: "First",
    },
    {
      key: "second",
      title: "second",
    },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return (
          <ForYouPost
            user={user}
            navigation={navigation}
            forYouPosts={forYouPosts}
          />
        );
      case "second":
        return (
          <ConnectedPosts
            user={user}
            navigation={navigation}
            connectedPosts={connectedPosts}
          />
        );

      default:
        return null;
    }
  };

  const selectIcon = (key) => {
    switch (key) {
      case "first":
        return (
          <Text fontWeight={index === 0 ? "800" : "500"}>
            For you <Text fontWeight="500"> |</Text>
          </Text>
        );
        break;
      case "second":
        return <Text fontWeight={index === 1 ? "800" : "500"}>Connected</Text>;
        break;
    }
    return;
  };

  const renderTabBar = (props) => {
    return (
      <Box alignItems="center" w="full">
        <Box display="flex" flexDirection="row">
          {props.navigationState.routes.map((route, i) => {
            return (
              <Box py="5" px="1" key={i}>
                <Pressable
                  onPress={() => {
                    setIndex(i);
                  }}
                >
                  {selectIcon(route.key)}
                </Pressable>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Box h="100%" w="100%">
      {/* <LinearGradient
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
      </Box> */}
      <Box>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(i) => setIndex(i)}
          initialLayout={{ width: layout.width, height: layout.height }}
          renderTabBar={renderTabBar}
          style={{
            minHeight: layout.height,
            backgroundColor: "white",
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
