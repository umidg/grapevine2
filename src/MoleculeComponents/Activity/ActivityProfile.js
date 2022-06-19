import { Text, Box, Flex, Spinner, Pressable } from "native-base";
import React, { useEffect, useState, useMemo } from "react";
import { grapevineBackend } from "../../API";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Tiktokvideo } from "../../AtomComponents/index";
const ActivityProfile = ({ activity, navigation }) => {
  const [post, setPost] = useState(null);
  useEffect(() => {
    if (
      activity.type == "post" ||
      activity.type == "like" ||
      activity.type == "comment"
    ) {
      grapevineBackend(
        "/post/getPostByUuid",
        { post_uuid: activity.action_uuid },
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
    } else if (activity.type == "share") {
      grapevineBackend(
        "/post/getPostByUuid",
        { post_uuid: activity.action_uuid },
        "POST"
      )
        .then(({ data }) => {
          if (data.status) {
            if (activity.type == "share") {
              grapevineBackend(
                "/post/getPostByUuid",
                { post_uuid: data.data.shared_post_uuid },
                "POST"
              ).then(({ data }) => {
                if (data.status) {
                  setPost({ ...data.data });
                }
              });
            }
            setPost({ ...data.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [activity]);

  const time = useMemo(() => {
    const date1 = new Date(activity.created_at);
    const date2 = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();
    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    const diffInMin = Math.floor(diffInTime / 60000);
    if (diffInMin < 1) return "few moments ago";
    else if (diffInMin < 60) return diffInMin + " min ago";
    else if (diffInMin < 1140) return Math.floor(diffInMin / 60) + " hour ago";
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }, [activity]);

  switch (activity.type) {
    case "post":
      return (
        <Pressable
          onPress={() =>
            navigation.navigate("PostPage", {
              post_uuid: activity.action_uuid,
            })
          }
          p={5}
          borderBottomWidth={1}
          borderColor="#d3d3d3"
        >
          <Box>
            <Text fontSize={10} mt={1} mb={1}>
              <Text fontWeight="800" color="#000">
                {activity?.user?.username + " "}
              </Text>
              Posted this {" " + time}
            </Text>
            {post ? (
              <>
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  {post.image_url ? (
                    <Box>
                      <Text>Image</Text>
                    </Box>
                  ) : (
                    <>
                      {/* {post.video_url && <Tiktokvideo uri={post.video_url} />} */}
                      {post.video_url && <Text>Tiktokvideo</Text>}
                    </>
                  )}

                  <Text fontSize={10} fontWeight="600" ml={3}>
                    {post.post}
                  </Text>
                </Flex>
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  <FontAwesome5 name="comment" size={16} color="#000" p="2" />
                  <Text textAlign={"center"} mr={3} ml={1}>
                    {post.comments?.length}
                  </Text>

                  <AntDesign name="hearto" size={16} color="#000" p="2" />
                  <Text textAlign={"center"} mr={3} ml={1}>
                    {post.likes?.length}
                  </Text>
                </Flex>
              </>
            ) : (
              <Spinner accessibilityLabel="Loading" color="primary" />
            )}
          </Box>
        </Pressable>
      );
    case "like":
      return (
        <Pressable
          onPress={() =>
            navigation.navigate("PostPage", {
              post_uuid: activity.action_uuid,
            })
          }
          p={5}
          borderBottomWidth={1}
          borderColor="#d3d3d3"
        >
          <Box>
            <Text fontSize={10} mt={1} mb={1}>
              <Text fontWeight="800" color="#000">
                {activity?.user?.username + " "}
              </Text>
              Liked this {" " + time}
            </Text>
            {post ? (
              <>
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  {post.image_url ? (
                    <Box>
                      <Text>Image</Text>
                    </Box>
                  ) : (
                    <>
                      {/* {post.video_url && <Tiktokvideo uri={post.video_url} />} */}
                      {post.video_url && <Text>Tiktokvideo</Text>}
                    </>
                  )}
                  <Box>
                    <Text fontSize={10} fontWeight="600" ml={3}>
                      {post.post}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  <FontAwesome5 name="comment" size={16} color="#000" p="2" />
                  <Text textAlign={"center"} mr={3} ml={1}>
                    {post.comments?.length}
                  </Text>

                  <AntDesign name="hearto" size={16} color="#000" p="2" />
                  <Text textAlign={"center"} mr={3} ml={1}>
                    {post.likes?.length}
                  </Text>
                </Flex>
              </>
            ) : (
              <Spinner accessibilityLabel="Loading" color="primary" />
            )}
          </Box>
        </Pressable>
      );
    case "comment":
      return (
        <Pressable
          onPress={() =>
            navigation.navigate("PostPage", {
              post_uuid: activity.action_uuid,
            })
          }
          p={5}
          borderBottomWidth={1}
          borderColor="#d3d3d3"
        >
          <Box>
            <Text fontSize={10} mt={1} mb={1}>
              <Text fontWeight="800" color="#000">
                {activity?.user?.username + " "}
              </Text>
              Commented this {" " + time}
            </Text>
            {post ? (
              <>
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  {post.image_url ? (
                    <Box>
                      <Text>Image</Text>
                    </Box>
                  ) : (
                    <>
                      {/* {post.video_url && <Tiktokvideo uri={post.video_url} />} */}
                      {post.video_url && <Text>Tiktokvideo</Text>}
                    </>
                  )}
                  <Box>
                    <Text fontSize={10} fontWeight="600" ml={3}>
                      {post.post}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  <FontAwesome5 name="comment" size={16} color="#000" p="2" />
                  <Text textAlign={"center"} mr={3} ml={1}>
                    {post.comments?.length}
                  </Text>

                  <AntDesign name="hearto" size={16} color="#000" p="2" />
                  <Text textAlign={"center"} mr={3} ml={1}>
                    {post.likes?.length}
                  </Text>
                </Flex>
              </>
            ) : (
              <Spinner accessibilityLabel="Loading" color="primary" />
            )}
          </Box>
        </Pressable>
      );
    case "share":
      return (
        <Pressable
          onPress={() =>
            navigation.navigate("PostPage", {
              post_uuid: activity.action_uuid,
            })
          }
          p={5}
          borderBottomWidth={1}
          borderColor="#d3d3d3"
        >
          <Box>
            <Text fontSize={10} mt={1} mb={1}>
              <Text fontWeight="800" color="#000">
                {activity?.user?.username + " "}
              </Text>
              shared this {" " + time}
            </Text>
            {post ? (
              <>
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  {post.image_url ? (
                    <Box>
                      <Text>Image</Text>
                    </Box>
                  ) : (
                    <>
                      {/* {post.video_url && <Tiktokvideo uri={post.video_url} />} */}
                      {post.video_url && <Text>Tiktokvideo</Text>}
                    </>
                  )}
                  <Box>
                    <Text fontSize={10} fontWeight="600" ml={3}>
                      {post.post}
                    </Text>
                  </Box>
                </Flex>
                <Flex
                  direction="row"
                  justifyContent={"flex-start"}
                  alignItems="center"
                >
                  <FontAwesome5 name="comment" size={16} color="#000" p="2" />
                  <Text textAlign={"center"} mr={3} ml={1}>
                    {post.comments?.length}
                  </Text>

                  <AntDesign name="hearto" size={16} color="#000" p="2" />
                  <Text textAlign={"center"} mr={3} ml={1}>
                    {post.likes?.length}
                  </Text>
                </Flex>
              </>
            ) : (
              <Spinner accessibilityLabel="Loading" color="primary" />
            )}
          </Box>
        </Pressable>
      );
    default:
      return <></>;
  }
};

export default ActivityProfile;
