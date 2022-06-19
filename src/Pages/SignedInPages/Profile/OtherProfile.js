import React, { useEffect, useState, useContext } from "react";

import { Box } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { grapevineBackend } from "../../../API";
import { ActivityIndicator } from "react-native";
import { Layout, PageComponent } from "../../../Exports/index";
const OtherProfile = ({ navigation, user_uuid }) => {
  const {
    Profile: { HeaderContainer, TabContainer, NetworkContainer },
  } = PageComponent;
  const { SignInLayout } = Layout;

  const [tiktokPost, setTiktokPost] = useState([]);
  const [textPost, setTextPost] = useState([]);
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  // const [show, setShow] = useState(true);
  useEffect(() => {
    grapevineBackend(`/auth/getuserInfo/${user_uuid}`, {}, "POST")
      .then(({ data }) => {
        if (data.status) {
          setUser({ ...data.data });
        }
      })
      .catch((err) => console.log(err));
    grapevineBackend(
      "/activity/get/myActivity",
      { user_uuid: user_uuid },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
          setActivities([...data.data.result]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (user?.posts?.length > 0) {
      let textPost_temp = [];
      let tikTokPost_temp = [];
      user.posts.forEach((post) => {
        if (post.post_type == "text") {
          textPost_temp.push({ ...post, username: user.username });
        } else if (post.post_type == "tiktok") {
          tikTokPost_temp.push({ ...post, username: user.username });
        }
      });
      setTextPost([...textPost_temp]);
      setTiktokPost([...tikTokPost_temp]);
    }
  }, [user]);

  return (
    <SignInLayout>
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
            <NetworkContainer user={user} />
            <TabContainer
              tiktokPost={tiktokPost}
              textPost={textPost}
              user={user}
              activities={activities}
              navigation={navigation}
            />
          </Box>
        </Box>
      ) : (
        <Box h="100%" w="100%" alignItem="center" justifyContent={"center"}>
          <ActivityIndicator size="small" color="#0000ff" />
        </Box>
      )}
    </SignInLayout>
  );
};
export default OtherProfile;
