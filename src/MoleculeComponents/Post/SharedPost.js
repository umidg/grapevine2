import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Center,
  Text,
  Image,
  Flex,
  Spinner,
  Pressable,
} from "native-base";
import PostHeader from "./PostComponents/PostHeader";
import CommentsContainer from "./PostComponents/CommentsContainer";
import LikeContainer from "./PostComponents/LikeContainer";
import { grapevineBackend } from "../../API";
import PostV2 from "./PostV2";
import GetPost from "../../Hooks/Posts/getPost";
const SharedPost = ({
  data,
  user,
  navigation,
  showLike = true,
  showComment = true,
}) => {
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

  const sharedPost = GetPost(data.shared_post_uuid);
  if (sharedPost.isLoading) {
    return <Spinner accessibilityLabel="Loading" />;
  }
  if (sharedPost.isError) {
    return <Text>error</Text>;
  }

  return (
    <Box w="100%" mb="12">
      <Box py="2">
        <PostHeader
          username={data?.username}
          user_uuid={data.user_uuid}
          navigation={navigation}
          address={user.address}
        />
      </Box>
      <Box w="100%" pl="5">
        {sharedPost.data && (
          <PostV2
            showLike={false}
            showComment={false}
            showProduct={false}
            data={sharedPost.data}
            user={user}
            navigation={navigation}
            shared
          />
        )}
      </Box>

      {showLike && (
        <Box>
          <LikeContainer
            liked={data.liked}
            post_uuid={data.uuid}
            user={user}
            timeStamp={time}
            count={data.like_count}
          />
        </Box>
      )}

      {showComment && (
        <Pressable
          onPress={() => {
            if (navigation) {
              navigation.navigate("CommentPage", {
                comments: data.comments,
                post_uuid: data.uuid,
              });
            }
          }}
        >
          <Box p="2">
            <CommentsContainer comments={data.comments} user={user} />
          </Box>
        </Pressable>
      )}
      <Box width={"100%"}>
        {data.products.map((_product) => {
          return (
            <Flex
              direction="row"
              justifyContent={"flex-start"}
              alignItems="center"
              p={1}
              key={_product.uuid}
              borderBottomColor={"#d3d3d3"}
              borderBottomWidth={1}
              borderTopColor="#d3d3d3"
              borderTopWidth={1}
            >
              <Image
                source={require("../../../assets/Images/2.png")}
                alt="img"
                h={"20"}
                w={"20"}
                flex={1}
              />
              <Box flex={4} px={2}>
                <Text fontWeight={"400"}>{_product.name}</Text>
                <Text fontWeight={"800"}>$25</Text>
              </Box>
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export default SharedPost;
