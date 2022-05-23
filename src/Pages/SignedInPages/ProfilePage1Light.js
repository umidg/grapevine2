import React, { useContext } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import HeaderContainer from "../../Components/ProfilePage1Light/Header/HeaderContainer";
import NetworkContainer from "../../Components/ProfilePage1Light/Networks/NetworkContainer";
import PhotosContainer from "../../Components/ProfilePage1Light/Photos/PhotosContainer";
import { Box, Switch } from "native-base";
import { ThemeValue } from "../../Context/ThemeContext";
import { Button } from "native-base";
import { UserValue } from "../../Context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LayoutFrame from "../../Layout/LayoutFrame";
import TabContainer from "../../Components/ProfilePage1Light/Tabs/TabContainer";
import PostContainer from "../../Components/ProfilePage1Light/Post/PostContainer";

const ProfilePage1Light = () => {
  const [theme, setTheme] = useContext(ThemeValue);
  const [user, setUser] = useContext(UserValue);

  const toggleTheme = () => {
    if (theme == "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser({ ...{ data: true } });
  };
  return (
    <LayoutFrame>
      <Box w="100%" h="100%" bg="theme.bg">
        <Button onPress={logout} bg="buttonDark">
          Logout
        </Button>
        <Switch onToggle={toggleTheme} isChecked={theme == "dark"} />
        <HeaderContainer />
        <View>
          <NetworkContainer />
        </View>

        {/* <TabContainer /> */}
      </Box>
    </LayoutFrame>
  );
};
export default ProfilePage1Light;
