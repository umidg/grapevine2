import { View, Text } from "react-native";
import React from "react";
import PostV2 from "./PostV2";
import TiktokPost from "./TiktokPost";
import SharedPost from "./SharedPost";

const PostContainer = ({ post, navigation, user }) => {
  if (post.shared_post_uuid) {
    return <SharedPost data={post} navigation={navigation} user={user} />;
  } else if (post.post_type == "text")
    return <PostV2 data={post} user={user} navigation={navigation} />;
  return <TiktokPost data={post} user={user} navigation={navigation} />;
};

export default PostContainer;
