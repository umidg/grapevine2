import React, { useState, useEffect, useContext } from 'react';
import { Box, Center, Text, Flex, Pressable, Image } from 'native-base';
import { UserValue } from '../../Context/UserContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';

import { Layout, PageComponent } from '../../Exports/index';
import { grapevineBackend } from '../../API';
const Home = ({ navigation }) => {
  const { SignInLayout } = Layout;
  const {
    Home: { ConnectedPosts, ForYouPost },
  } = PageComponent;
  const [postType, setPostType] = useState('connected');
  const [error, setError] = useState(false);
  const [user, setUser] = useContext(UserValue);
  const [forYouPosts, setForYouPosts] = useState([]);
  const [connectedPosts, setConnectedPosts] = useState([]);
  const [connectedPostApiParams, setConnectedPostApiParams] = useState({
    posts: [],
    page: 1,
    limit: 5,
  });
  const [forYouPostApiParams, setForYouPostApiParams] = useState({
    page: 1,
    limit: 5,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: 'first',
      title: 'First',
    },
    {
      key: 'second',
      title: 'second',
    },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <ForYouPost
            user={user}
            navigation={navigation}
            forYouPosts={forYouPosts}
            loadNextPage={fetchForYouPosts}
          />
        );
      case 'second':
        return (
          <ConnectedPosts
            user={user}
            navigation={navigation}
            connectedPosts={connectedPosts}
            loadNextPage={fetchConnectedPosts}
          />
        );

      default:
        return null;
    }
  };

  const fetchConnectedPosts = () => {
    if (connectedPostApiParams) {
      grapevineBackend(
        `/post/connectedPost?page=${connectedPostApiParams.page}&limit=${connectedPostApiParams.limit}`,
        {},
        'POST'
      )
        .then(async ({ data }) => {
          setError(false);
          if (data.status == true && data.data.result.length > 0) {
            setConnectedPostApiParams({ ...data.data.next });
            setConnectedPosts([...connectedPosts, ...data.data.result]);
          }
        })
        .catch((err) => {
          console.log(err, 'err');
          setError(true);
        });
    }
  };

  const fetchForYouPosts = () => {
    if (forYouPostApiParams) {
      grapevineBackend(
        `/post/forYouPost?page=${forYouPostApiParams.page}&limit=${forYouPostApiParams.limit}`,
        {},
        'POST'
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
    const unsubscribe = navigation.addListener('focus', () => {
      fetchConnectedPosts();
      fetchForYouPosts();
    });

    return unsubscribe;
  }, []);

  const selectIcon = (key) => {
    switch (key) {
      case 'first':
        return (
          <Text fontWeight={index === 0 ? '800' : '500'}>
            For you <Text fontWeight='500'> |</Text>
          </Text>
        );
        break;
      case 'second':
        return <Text fontWeight={index === 1 ? '800' : '500'}>Connected</Text>;
        break;
    }
    return;
  };

  const renderTabBar = (props) => {
    return (
      <Box alignItems='center' w='full'>
        <Box display='flex' flexDirection='row'>
          {props.navigationState.routes.map((route, i) => {
            return (
              <Box py='5' px='1' key={i}>
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
    <Box h='100%' w='100%'>
      <Box>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={(i) => setIndex(i)}
          initialLayout={{ width: layout.width, height: layout.height }}
          renderTabBar={renderTabBar}
          style={{
            minHeight: layout.height,
            backgroundColor: 'white',
          }}
        />
      </Box>
    </Box>
  );
};

export default Home;
