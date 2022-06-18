import { TextArea, Text, Box, Pressable, Flex } from "native-base";
import React, { useState, useContext } from "react";
import Icon from "react-native-vector-icons/AntDesign";
import PostHeader from "../../MoleculeComponents/Post/PostComponents/PostHeader";
import { UserValue } from "../../Context/UserContext";
import { grapevineBackend } from "../../API";
import Toast from "react-native-root-toast";
import { AtomComponents, Layout } from "../../Exports/index";
const Post_Instagram_Tiktok_Youtube = ({ navigation, route }) => {
  const { RegularImage, Tiktokvideo } = AtomComponents;
  const { SignInLayout } = Layout;
  const { tiktokVideo } = route.params;
  const [user, setUser] = useContext(UserValue);
  const [caption, setCaption] = useState("");

  const uploadPost = () => {
    let data = {
      title: "Title",
      post_type: "tiktok",
      user_uuid: user.uuid,
      post: caption,
      video_url: tiktokVideo.embed_link,
      keys: user.intrests,
      username: user.username,
    };
    grapevineBackend("/post/create", data, "POST")
      .then(async ({ data }) => {
        if (data.status) {
          navigation.navigate("Home");
          Toast.show("Successfully Posted", {
            duration: Toast.durations.SHORT,
          });
        } else {
          Toast.show("Something Went Wrong", {
            duration: Toast.durations.SHORT,
          });
        }
      })
      .catch((err) =>
        Toast.show("Something Went Wrong", {
          duration: Toast.durations.SHORT,
        })
      );
  };

  return (
    <SignInLayout>
      <Box h="100%" w="100%" bg="#fff" mb={5}>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          p="5"
          borderBottomWidth={1}
          borderBottomColor="#d3d3d3"
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Text fontSize={14} fontWeight="300" color={"#000"}>
              Cancel
            </Text>
          </Pressable>

          <Pressable onPress={uploadPost}>
            <Box
              bg="buttonPrimaryColor"
              p="1"
              pr="3"
              pl="3"
              borderRadius={"full"}
              _text={{
                fontWeight: "800",
              }}
            >
              Post
            </Box>
          </Pressable>
        </Flex>
        <Flex
          p={5}
          direction="row"
          justifyContent={"flex-end"}
          borderBottomWidth={1}
          borderBottomColor="#d3d3d3"
        >
          <Box flex={3}>
            <RegularImage
              image={require("../../../assets/Images/2.png")}
              h={70}
              w={70}
            />
          </Box>
          <Box flex={1}></Box>
          <Box flex={12}>
            <Text fontSize={16} fontWeight={"800"}>
              Custom Caption
            </Text>
            <TextArea
              placeholder="Write a Caption..."
              borderWidth="0"
              w="100%"
              h={10}
              onChangeText={(text) => setCaption(text)}
              value={caption}
            ></TextArea>
          </Box>
        </Flex>
        <Flex
          borderBottomWidth={1}
          borderBottomColor="#d3d3d3"
          p={5}
          direction="row"
          justifyContent="space-between"
        >
          <Text fontWeight={"800"} fontSize={16}>
            Tag Brands
          </Text>
          <Icon name="arrowright" size={30} color="#000" />
        </Flex>
        <Flex
          borderBottomWidth={1}
          borderBottomColor="#d3d3d3"
          p={5}
          direction="row"
          justifyContent="space-between"
        >
          <Text fontWeight={"800"} fontSize={16}>
            Location
          </Text>
          <Icon name="arrowright" size={30} color="#000" />
        </Flex>
        <Flex
          borderBottomWidth={1}
          borderBottomColor="#d3d3d3"
          p={5}
          direction="row"
          justifyContent="space-between"
        >
          <Text fontWeight={"800"} fontSize={16}>
            Share
          </Text>
          <Icon name="arrowright" size={30} color="#000" />
        </Flex>
        <Box p={5}>
          <Text fontWeight={"800"} fontSize={16} pb={2}>
            Preview
          </Text>
          <Flex justifyContent={"center"} alignItems="center">
            <Box
              w="80%"
              borderRadius={"md"}
              alignItems={"center"}
              p={3}
              borderWidth={1}
              borderColor="#d3d3d3"
            >
              <PostHeader username={user.username} />
              <Box w="100%">
                <Text mt={1} italic>
                  {caption}
                </Text>
              </Box>
              <Box w="100%" mt={3}>
                <Tiktokvideo uri={tiktokVideo.embed_link} />
              </Box>
            </Box>
          </Flex>
        </Box>

        <Pressable onPress={uploadPost} alignItems="center">
          <Box
            bg="buttonPrimaryColor"
            p="1"
            pr="3"
            pl="3"
            w="80%"
            borderRadius={"full"}
            alignItems="center"
            _text={{
              fontWeight: "800",
            }}
          >
            Post
          </Box>
        </Pressable>
      </Box>
    </SignInLayout>
  );
};

export default Post_Instagram_Tiktok_Youtube;
