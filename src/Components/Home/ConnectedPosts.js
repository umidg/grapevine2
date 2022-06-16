import React, { useEffect, useState } from "react";
import { PostContainer } from "../../MoleculeComponents/index";
import { Spinner, Center, Box, Text, ScrollView } from "native-base";
import { grapevineBackend } from "../../API";
const ConnectedPosts = ({ user, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [params, setParams] = useState({ page: 1, limit: 5 });

  const fetchPosts = () => {
    grapevineBackend(
      `/post/getAllPost?page=${params.page}&limit=${params.limit}`,
      {},
      "POST"
    )
      .then(async ({ data }) => {
        console.log(data);
        if (data.status == true) {
          setError(false);
          setParams({ ...data.data.next });
          setPosts([...posts, ...data.data.result]);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };

  const onScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom &&
      params.page
    ) {
      fetchPosts();
    }
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <>
      {error ? (
        <Center h="100%" w="100%">
          <Text fontSize="20" fontWidth="800" color="primary">
            Error
          </Text>
        </Center>
      ) : posts.length > 0 ? (
        <>
          <Box pb="70" p={2} mt={35}>
            <ScrollView
              h="100%"
              onScroll={({ nativeEvent }) => {
                onScroll(nativeEvent);
              }}
            >
              {posts.map((post) => {
                return (
                  <PostContainer
                    post={post}
                    key={post.uuid}
                    user={user}
                    navigation={navigation}
                  />
                );
              })}
            </ScrollView>
          </Box>
        </>
      ) : (
        <Center h="100%" w="100%">
          <Spinner accessibilityLabel="Loading" color="primary" />
        </Center>
      )}
    </>
  );
};

export default ConnectedPosts;
