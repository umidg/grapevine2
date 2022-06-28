import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Spinner, Center } from "native-base";
import { Layout, MolecularComponents } from "../../Exports/index";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
import GetPost from "../../Hooks/Posts/getPost";
const PostPage = ({ navigation, route }) => {
  const {
    params: { post_uuid },
  } = route;
  const { PostContainer } = MolecularComponents;
  const [user, setUser] = useContext(UserValue);

  const post = GetPost(post_uuid);
  const { SignInLayout, BackLayout } = Layout;
  console.log(post.data?.comments, "post");

  if (post.isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner accessibilityLabel="Loading" />
      </Center>
    );
  }
  if (post.isError) {
    return (
      <Center h="100%" w="100%">
        <Image
          source={require("../../../assets/Logo/Logo.png")}
          size={100}
          resizeMode="contain"
          p="5"
          alt="Image"
        />
        <Text fontSize="16" fontWidth="800" color="primary" mt="10">
          Sorry, no post yet.
        </Text>
      </Center>
    );
  }

  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box h="full" w="full" bg="white">
        <Text fontWeight="800" fontSize={16} textAlign="center" mb="2">
          Post
        </Text>
        <SignInLayout>
          <Box h="100%" w="100%">
            {post.data ? (
              <PostContainer
                post={post.data}
                user={user}
                navigation={navigation}
              />
            ) : (
              <Spinner accessibilityLabel="Loading" />
            )}
          </Box>
        </SignInLayout>
      </Box>
    </BackLayout>
  );
};

export default PostPage;
