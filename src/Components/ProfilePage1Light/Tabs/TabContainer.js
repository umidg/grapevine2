import React from "react";
import { View, Box, Text, Image } from "native-base";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { Pressable, Animated } from "react-native";
import PhotoContainer from "../Photos/PhotosContainer";
import PostContainer from "../Post/PostContainer";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
const Grid = require("../../../../assets/Icons/grid.png");
const Pen = require("../../../../assets/Icons/pen.png");
const Person = require("../../../../assets/Icons/person.png");

const renderScene = SceneMap({
  first: PhotoContainer,
  second: PostContainer,
  third: ProfileInfo,
});

const TabContainer = () => {
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
    {
      key: "third",
      title: "third",
    },
  ]);

  const selectIcon = (key) => {
    switch (key) {
      case "first":
        return <Image alt="grid" source={Grid} h="5" w="5" />;
        break;
      case "second":
        return <Image alt="pen" source={Pen} h="5" w="5" />;
        break;
      case "third":
        return <Image alt="person" source={Person} h="5" w="5" />;
    }
    return;
  };

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const borderColor =
            index === i ? "buttonPrimaryColor" : "transparent";
          return (
            <Box
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              key={i}
            >
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
    );
  };

  return (
    <Box w="100%" h="100%">
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width, height: layout.height }}
        renderTabBar={renderTabBar}
        style={{ minHeight: layout.height }}
      />
    </Box>
  );
};

export default TabContainer;
