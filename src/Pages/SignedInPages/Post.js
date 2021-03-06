import {
  Box,
  Flex,
  Image,
  Text,
  TextArea,
  View,
  Pressable,
  Center,
} from "native-base";
import React, { useEffect, useState, useContext, useMemo } from "react";
import LayoutFrame from "../../Layout/LayoutFrame";
import RoundImage from "../../AtomComponents/Image/RoundImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UserValue } from "../../Context/UserContext";
import LoadingMessageModal from "../../Modal/LoadingMessageModal";
import { grapevineBackend } from "../../API";
import TiktokVideoConteiner from "../../Components/Post/TiktokVideoConteiner";
import Tiktokvideo from "../../AtomComponents/TiktokWebview/Tiktokvideo";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
const Post = ({ navigation }) => {
  const [user, setUser] = useContext(UserValue);
  const [post, setPost] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState("text");
  const [tiktokVideo, setTiktokVideo] = useState(null);
  const uploadPost = () => {
    let data = {
      title: "Title",
      post_type: type,
      user_uuid: user.uuid,
      keys: user.intrests,
      username: user.username,
    };

    if (type == "text") {
      if (post.length < 1) {
        Toast.show("enter post", {
          duration: Toast.durations.SHORT,
        });
        return;
      }
      data.post = post;
    } else if (type == "tiktok") {
      if (!tiktokVideo) {
        Toast.show("Select a video", {
          duration: Toast.durations.SHORT,
        });

        return;
      } else {
        navigation.navigate("Post_Instagram_Yiktok_Youtube", {
          tiktokVideo: tiktokVideo,
        });
        return;
      }
    }
    setShowModal(true);
    grapevineBackend("/post/create", data, "POST")
      .then(async ({ data }) => {
        setPost("");
        navigation.navigate("Home");
        setModalMessage(data.message);
      })
      .catch((err) => setModalMessage("Something Went Wrong"));
  };

  const layout = useMemo(() => {
    switch (type) {
      case "text":
        return (
          <View h="100%" w="100%">
            <Flex
              direction="row"
              alignItems="center"
              justifyContent={"space-between"}
              px="4"
            >
              <RoundImage
                image={require("../../../assets/Images/1.png")}
                size={50}
              />
              <TextArea
                placeholder="Start typing here"
                borderWidth="0"
                w="90%"
                mt="10"
                onChangeText={(text) => setPost(text)}
                value={post}
              ></TextArea>
            </Flex>
          </View>
        );
      case "tiktok":
        return (
          <View h="100%" w="100%">
            <View h="25%" w="100%" bg="blue.200">
              {tiktokVideo && tiktokVideo.embed_link && (
                <Tiktokvideo uri={tiktokVideo.embed_link} />
              )}
            </View>
            <Center h="5%" w="100%" bg="#fff">
              <Text fontWeight={"800"} fontSize={14} color="buttonPrimaryColor">
                TikTok ...
              </Text>
            </Center>
            <View h="70%" w="100%">
              <TiktokVideoConteiner
                onPress={(video) => setTiktokVideo({ ...video })}
                selectedId={tiktokVideo && tiktokVideo.id}
              />
            </View>
          </View>
        );
    }
  }, [type, post, tiktokVideo]);

  return (
    // <LayoutFrame>
    <Box h="100%" w="100%">
      <LoadingMessageModal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Post"
        message={modalMessage}
        setMessage={setModalMessage}
      />
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p="5"
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
            {type == "text" ? "Post" : "Next"}
          </Box>
        </Pressable>
      </Flex>
      {layout}

      <Flex
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
        bg="#343749"
        borderRadius={"full"}
        position={"absolute"}
        pl="5"
        pr="5"
        mr="5"
        right="0"
        bottom="25%"
      >
        <AntDesign
          name="instagram"
          size={24}
          color={type == "instagram" ? "#fff" : "#66686b"}
        />
        <Pressable onPress={() => setType("tiktok")} p="1">
          {type == "tiktok" ? (
            <Image
              source={require("../../../assets/Icons/TikTok_light.png")}
              h="6"
              w="5"
              alt="tiktok_light"
              m="2"
            />
          ) : (
            <Image
              source={require("../../../assets/Icons/tiktok_gray.png")}
              h="6"
              w="5"
              alt="tiktok_gray"
              m="2"
            />
          )}
        </Pressable>

        <AntDesign
          name="youtube"
          size={24}
          color={type == "youtube" ? "#fff" : "#66686b"}
          p="2"
        />

        <Pressable onPress={() => setType("text")} p="2">
          <Entypo
            name="message"
            size={30}
            color={type == "text" ? "#fff" : "#66686b"}
          />
        </Pressable>
      </Flex>
    </Box>
    // </LayoutFrame>
  );
};

export default Post;
