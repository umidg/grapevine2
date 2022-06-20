import React, { useEffect, useState } from "react";
import { PostContainer } from "../../MoleculeComponents/index";
import { Spinner, Center, Box, Text, Image, ScrollView } from "native-base";
import { grapevineBackend } from "../../API";
const ConnectedPosts = ({ user, navigation }) => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [params, setParams] = useState({ page: 1, limit: 5 });

  const fetchPosts = () => {
    grapevineBackend(
      `/post/connectedPost?page=${params.page}&limit=${params.limit}`,
      {},
      "POST"
    )
      .then(async ({ data }) => {
        setError(false);
        if (data.status == true && data.data.result.length > 0) {
          setParams({ ...data.data.next });
          setPosts([...posts, ...data.data.result]);
        }
      })
      .catch((err) => {
        console.log(err, "err");
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
      {posts.length == 0 ? (
        <Center h="100%" w="100%">
          <Image
            source={require("../../../assets/Logo/Logo.png")}
            size={100}
            resizeMode="contain"
            p="5"
            alt="Image"
          />
          <Text fontSize="16" fontWidth="800" color="primary" mt="10">
            Sorry, no posts yet.
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
          <Spinner accessibilityLabel="Loading" />
        </Center>
      )}
    </>
  );
};

export default ConnectedPosts;
