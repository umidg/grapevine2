import React from "react";
import { View, Box, Text, Image } from "native-base";
import { useWindowDimensions } from "react-native";
import { TabView } from "react-native-tab-view";
import { Pressable } from "react-native";
import PhotoContainer from "../../Components/ProfilePage1Light/Photos/PhotosContainer";
import PostContainer from "../../Components/ProfilePage1Light/Post/PostContainer";
import ProfileInfo from "../../Components/ProfilePage1Light/ProfileInfo/ProfileInfo";
const Grid = require("../../../assets/Icons/grid.png");
const Pen = require("../../../assets/Icons/pen.png");
const Person = require("../../../assets/Icons/person.png");
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import Activity from "../ProfilePage1Light/ProfileInfo/Activity";

const TabContainer = ({ tiktokPost, textPost, user }) => {
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
  const renderScene = ({ route }) => {
    switch (route.key) {
      case "first":
        return <PhotoContainer tiktokPost={tiktokPost} />;
      case "second":
        return <PostContainer textPost={textPost} user={user} />;
      case "third":
        // return <ProfileInfo />;
        return <Activity />;
      default:
        return null;
    }
  };

  const selectIcon = (key) => {
    switch (key) {
      case "first":
        return <MaterialCommunityIcons name="grid" size={16} color="black" />;
        break;
      case "second":
        return <SimpleLineIcons name="pencil" size={16} color="black" />;
        break;
      case "third":
        return <Ionicons name="person-outline" size={16} color="black" />;
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
