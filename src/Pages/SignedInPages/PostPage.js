import React, { useContext, useEffect, useState } from "react";
import { Box, Text, Spinner } from "native-base";
import { Layout, MolecularComponents } from "../../Exports/index";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
const PostPage = ({ navigation, route }) => {
  const {
    params: { post_uuid },
  } = route;
  const { PostContainer } = MolecularComponents;
  const [post, setPost] = useState(null);
  const [user, setUser] = useContext(UserValue);
  useEffect(() => {
    grapevineBackend("/post/getPostByUuid", { post_uuid: post_uuid }, "POST")
      .then(({ data }) => {
        if (data.status) {
          setPost({ ...data.data });
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const { SignInLayout, BackLayout } = Layout;
  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <SignInLayout>
        <Box h="100%" w="100%" p="10%">
          <Text
            color={"primary"}
            fontWeight="800"
            fontSize={22}
            textAlign="center"
          >
            Post
          </Text>
          {post ? (
            <PostContainer post={post} user={user} navigation={navigation} />
          ) : (
            <Spinner accessibilityLabel="Loading" />
          )}
        </Box>
      </SignInLayout>
    </BackLayout>
  );
};

export default PostPage;
