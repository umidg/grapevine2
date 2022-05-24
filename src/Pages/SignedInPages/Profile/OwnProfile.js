import React, { useEffect, useState, useContext } from "react";
import HeaderContainer from "../../../Components/Profile/HeaderConatiner";
import NetworkContainer from "../../../Components/ProfilePage1Light/Networks/NetworkContainer";
import { Box, Button, Switch, Text } from "native-base";
import LayoutFrame from "../../../Layout/LayoutFrame";
import TabContainer from "../../../Components/Profile/TabContainer";
import { AntDesign } from "@expo/vector-icons";
import { grapevineBackend } from "../../../API";
import { UserValue } from "../../../Context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import SlideShow from "../../../Components/Profile/SlideShow";
const OwnProfile = ({ navigation }) => {
  const [tiktokPost, setTiktokPost] = useState([]);
  const [textPost, setTextPost] = useState([]);
  const [user, setUser] = useContext(UserValue);
  // const [show, setShow] = useState(true);
  useEffect(() => {
    grapevineBackend("/post/userposts", { uuid: user.uuid }, "POST")
      .then(({ data }) => {
        if (data.status) {
          let textPost_temp = [];
          let tikTokPost_temp = [];
          data.data.forEach((post) => {
            if (post.post_type == "text") {
              textPost_temp.push({ ...post, username: user.username });
            } else if (post.post_type == "tiktok") {
              tikTokPost_temp.push({ ...post, username: user.username });
            }
          });
          setTextPost([...textPost_temp]);
          setTiktokPost([...tikTokPost_temp]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser({ ...{ data: true } });
  };

  return (
    <LayoutFrame>
      <Box w="100%" h="100%">
        <Button onPress={logout} bg="buttonDark">
          Logout
        </Button>
        {/* <Button onPress={() => setShow(true)}>show</Button> */}
        {/* <Box pl="2">
          <AntDesign
            name="arrowleft"
            size={30}
            color="black"
            onPress={() => navigation.pop()}
          />
        </Box> */}
        {/* <SlideShow
          show={show}
          close={() => setShow(false)}
          component={<Text>hello</Text>}
        /> */}
        <Box w="100%" h="100%" bg="theme.bg">
          <HeaderContainer navigation={navigation} user={user} />
          <NetworkContainer />
          <TabContainer
            tiktokPost={tiktokPost}
            textPost={textPost}
            user={user}
          />
        </Box>
      </Box>
    </LayoutFrame>
  );
};
export default OwnProfile;
