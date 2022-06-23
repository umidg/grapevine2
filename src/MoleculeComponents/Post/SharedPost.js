import React, { useState, useEffect, useMemo } from "react";
import { Box, Center, Text, Image, Flex } from "native-base";
import PostHeader from "./PostComponents/PostHeader";
import CommentsContainer from "./PostComponents/CommentsContainer";
import LikeContainer from "./PostComponents/LikeContainer";
import { grapevineBackend } from "../../API";
import PostV2 from "./PostV2";
const SharedPost = ({ data, user, navigation }) => {
  const [post, setPost] = useState(null);
  const time = useMemo(() => {
    const date1 = new Date(data.created_at);
    const date2 = new Date();

    const oneDay = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.floor(diffInTime / oneDay);

    const diffInMin = Math.floor(diffInTime / 60000);
    if (diffInMin < 1) return "few moments ago";
    else if (diffInMin < 60) return diffInMin + " min ago";
    else if (diffInMin < 1140) return Math.floor(diffInMin / 60) + " hour ago";
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }, [data]);

  useEffect(() => {
    grapevineBackend(
      "/post/getPostByUuid",
      { post_uuid: data.shared_post_uuid },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
          setPost({ ...data.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data]);
  return (
    <Box w="100%" mb="12">
      <Box py="2">
        <PostHeader
          username={data.username}
          user_uuid={data.user_uuid}
          navigation={navigation}
          address={user.address}
        />
      </Box>
      <Box w="100%" pl="5">
        {post && (
          <PostV2
            showLike={false}
            showComment={false}
            data={post}
            user={user}
            navigation={navigation}
            shared
          />
        )}
      </Box>
      <Box>
        <LikeContainer
          likes={data.likes}
          post_uuid={data.uuid}
          user={user}
          timeStamp={time}
        />
      </Box>
      <Box p="2">
        <CommentsContainer comments={data.comments} user={user} />
      </Box>
    </Box>
  );
};

export default SharedPost;
