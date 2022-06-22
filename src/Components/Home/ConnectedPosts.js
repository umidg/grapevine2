import React, { useEffect, useState } from "react";
import { PostContainer } from "../../MoleculeComponents/index";
import { Spinner, Center, Box, Text, Image, ScrollView } from "native-base";
const ConnectedPosts = ({ user, navigation, connectedPosts, loadNextPage }) => {
  const onScroll = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20;
    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      loadNextPage();
    }
  };

  return (
    <>
      {connectedPosts.length == 0 ? (
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
      ) : connectedPosts.length > 0 ? (
        <>
          <Box pb="70" p={2} mt={35}>
            <ScrollView
              h="100%"
              onScroll={({ nativeEvent }) => {
                onScroll(nativeEvent);
              }}
            >
              {connectedPosts.map((post) => {
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
