import { Text, Box, Flex, Spinner } from "native-base";
import React, { useEffect, useState } from "react";
import { grapevineBackend } from "../../API";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

const ActivityPost = ({ activity }) => {
  const [post, setPost] = useState(null);
  useEffect(() => {
    grapevineBackend(
      "/post/getPostByUuid",
      { post_uuid: activity.post_uuid },
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
  }, [activity]);
  return (
    <Box>
      <Text fontSize={12} fontWeight="800" color="#000" mt={1} mb={1}>
        {activity.message}
      </Text>
      {post ? (
        <>
          <Flex
            direction="row"
            justifyContent={"flex-start"}
            alignItems="center"
          >
            {post.image_url && (
              <Box>
                <Text>Image</Text>
              </Box>
            )}
            <Box>
              <Text>{post.post}</Text>
            </Box>
          </Flex>
          <Flex
            direction="row"
            justifyContent={"flex-start"}
            alignItems="center"
          >
            <Box m={2}>
              <FontAwesome5 name="comment" size={16} color="#000" p="2" />
              <Text textAlign={"center"}>{post.comments?.length}</Text>
            </Box>
            <Box m={2}>
              <AntDesign name="hearto" size={16} color="#000" p="2" />
              <Text textAlign={"center"}>{post.likes?.length}</Text>
            </Box>
          </Flex>
        </>
      ) : (
        <Spinner accessibilityLabel="Loading" color="primary" />
      )}
    </Box>
  );
};

export default ActivityPost;
