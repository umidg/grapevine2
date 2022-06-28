import React, { useState, useEffect, useContext } from "react";
import { Box, Center, Text, Flex, Pressable, Image } from "native-base";
import { UserValue } from "../../Context/UserContext";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { Layout, PageComponent } from "../../Exports/index";
import GetPost from "../../Hooks/Posts/getPosts";
const Home = ({ navigation }) => {
  const {
    Home: { ConnectedPosts, ForYouPost },
  } = PageComponent;
  const [user, setUser] = useContext(UserValue);
  const { forYouPosts, connectedPosts } = GetPost();
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

  // return <Text>hello</Text>;
  return (
    <Box h="100%" w="100%">
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
