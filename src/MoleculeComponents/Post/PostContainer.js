import { View, Text } from "react-native";
import React from "react";
import PostV2 from "./PostV2";
import TiktokPost from "./TiktokPost";
import SharedPost from "./SharedPost";
import GetPost from "../../Hooks/Posts/getPost";
import { Spinner } from "native-base";

const PostContainer = ({ post, navigation, user }) => {
  const _post = GetPost(post.uuid);
  if (_post.isLoading) {
    return <Spinner accessibilityLabel="Loading" />;
  }

  if (_post.isError || !_post.data) {
    return <Text>error</Text>;
  }
  if (_post.data.shared_post_uuid) {
    return <SharedPost data={_post.data} navigation={navigation} user={user} />;
  } else if (_post.data.post_type == "text")
    return <PostV2 data={_post.data} user={user} navigation={navigation} />;
  return <TiktokPost data={_post.data} user={user} navigation={navigation} />;
};

export default React.memo(PostContainer);
