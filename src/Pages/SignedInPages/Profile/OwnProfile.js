import React, { useEffect, useState, useContext } from 'react';
import Toast from 'react-native-root-toast';
import { Box } from 'native-base';
import { grapevineBackend } from '../../../API';
import { UserValue } from '../../../Context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SlideShow from "../../../Components/Profile/SlideShow";
import { Layout, PageComponent, Modal } from '../../../Exports/index';

const OwnProfile = ({ navigation }) => {
  const {
    Profile_Own: { HeaderContainer, TabContainer, NetworkContainer },
  } = PageComponent;
  const { TiktokLoginModel } = Modal;
  const { SignInLayout } = Layout;

  const [tiktokPost, setTiktokPost] = useState([]);
  const [textPost, setTextPost] = useState([]);
  const [activities, setActivities] = useState([]);
  const [user, setUser] = useContext(UserValue);
  const [showTiktokModal, setShowTiktokModal] = useState(false);
  const tiktokLoginSuccess = ({ token, posts, refresh_token }) => {
    console.log(token, posts, refresh_token, 'connecting');
    // setShowTiktokModal(false);
    // Toast.show("loading", {
    //   duration: Toast.durations.SHORT,
    // });
    // grapevineBackend(
    //   "/tiktok/connect",
    //   {
    //     user_uuid: user.uuid,
    //     tiktokToken: token,
    //     tiktokPost: posts,
    //     tiktok_refresh: refresh_token,
    //   },
    //   "POST"
    // )
    //   .then(({ data }) => {
    //     if (data.status) {
    //       setUser({ ...user, ...data.data });
    //     } else {
    //       Toast.show("Something Went Wrong", {
    //         duration: Toast.durations.SHORT,
    //       });
    //     }
    //   })
    //   .catch((err) =>
    //     Toast.show("Something Went Wrong", {
    //       duration: Toast.durations.SHORT,
    //     })
    //   );
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setShowTiktokModal(false);
      grapevineBackend('/post/userposts', { uuid: user.uuid }, 'POST')
        .then(({ data }) => {
          if (data.status) {
            let textPost_temp = [];
            let tikTokPost_temp = [];
            data.data.result.forEach((post) => {
              if (post.post_type == 'text') {
                textPost_temp.push({ ...post, username: user.username });
              } else if (post.post_type == 'tiktok') {
                tikTokPost_temp.push({ ...post, username: user.username });
              }
            });
            setTextPost([...textPost_temp]);
            setTiktokPost([...tikTokPost_temp]);
          }
        })
        .catch((err) => console.log(err));
      grapevineBackend(
        '/activity/get/myActivity?limit=2',
        { user_uuid: user.uuid },
        'POST'
      )
        .then(({ data }) => {
          if (data.status) {
            setActivities([...data.data.result]);
          }
        })
        .catch((err) => console.log(err));
    });
    return unsubscribe;
  }, []);
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser({ ...{ data: true } });
  };

  return (
    <SignInLayout>
      <TiktokLoginModel
        show={showTiktokModal}
        close={() => setShowTiktokModal(false)}
        loginSuccess={(d) => tiktokLoginSuccess(d)}
      />
      <Box w='100%' h='100%'>
        <Box w='100%' h='100%'>
          <HeaderContainer
            navigation={navigation}
            user={user}
            logout={logout}
          />
          <NetworkContainer
            setShowTiktokModal={setShowTiktokModal}
            user={user}
          />
          <TabContainer
            tiktokPost={tiktokPost}
            textPost={textPost}
            user={user}
            activities={activities}
            navigation={navigation}
          />
        </Box>
      </Box>
    </SignInLayout>
  );
};
export default OwnProfile;
