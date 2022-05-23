import React, { useEffect, useState, useContext } from "react";
import HeaderContainer from "../../../Components/Profile/HeaderConatiner";
import NetworkContainer from "../../../Components/ProfilePage1Light/Networks/NetworkContainer";
import { Box, Button, Switch, Text } from "native-base";
import LayoutFrame from "../../../Layout/LayoutFrame";
import TabContainer from "../../../Components/Profile/TabContainer";
import { AntDesign } from "@expo/vector-icons";
import { grapevineBackend } from "../../../API";
import { ActivityIndicator } from "react-native";

// import SlideShow from "../../../Components/Profile/SlideShow";
const OtherProfile = ({ navigation, user_uuid }) => {
  const [tiktokPost, setTiktokPost] = useState([]);
  const [textPost, setTextPost] = useState([]);
  const [user, setUser] = useState(null);
  // const [show, setShow] = useState(true);
  useEffect(() => {
    grapevineBackend(`/auth/getuserInfo/${user_uuid}`, {}, "POST")
      .then(({ data }) => {
        if (data.status) {
          setUser({ ...data.data });
        }
        grapevineBackend("/post/userposts", { uuid: user_uuid }, "POST")
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
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <LayoutFrame>
      {user ? (
        <Box w="100%" h="100%">
          {/* <Button onPress={() => setShow(true)}>show</Button> */}
          <Box pl="2">
            <AntDesign
              name="arrowleft"
              size={30}
              color="black"
              onPress={() => navigation.pop()}
            />
          </Box>
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
      ) : (
        <Box h="100%" w="100%" alignItem="center" justifyContent={"center"}>
          <ActivityIndicator size="small" color="#0000ff" />
        </Box>
      )}
    </LayoutFrame>
  );
};
export default OtherProfile;
