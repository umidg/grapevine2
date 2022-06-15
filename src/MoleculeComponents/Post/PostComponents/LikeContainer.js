import React, { memo, useEffect, useMemo, useState } from "react";
import { Box, Flex, Pressable, Text, View, Modal, Button } from "native-base";
import RegularImage from "../../../AtomComponents/Image/RegularImage";
import { grapevineBackend } from "../../../API";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

const LikeContainer = ({ likes, user, post_uuid, timeStamp }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, SetLikeCount] = useState(likes.length);
  const [openModal, setOpenModal] = useState(false);

  const handleLike = async () => {
    if (liked) {
      setLiked(false);
      grapevineBackend(
        "/likes/dislike",
        {
          post_uuid: post_uuid,
          user_uuid: user.uuid,
        },
        "POST"
      )
        .then(({ data }) => {
          if (data.status) {
            SetLikeCount(likeCount - 1);
            setLiked(false);
          } else {
            setLiked(true);
          }
        })
        .catch((err) => setLiked(true));
    } else {
      setLiked(true);
      grapevineBackend(
        "/likes/create",
        {
          post_uuid: post_uuid,
          user_uuid: user.uuid,
        },
        "POST"
      )
        .then(({ data }) => {
          if (data.status) {
            SetLikeCount(likeCount + 1);
            setLiked(true);
          } else {
            setLiked(false);
          }
        })
        .catch((err) => setLiked(false));
    }
  };

  const handleShare = () => {
    Toast.show("Sharing", {
      duration: Toast.durations.LONG,
    });
    grapevineBackend(
      "/post/share",
      {
        post_uuid: post_uuid,
        user_uuid: user.uuid,
        username: user.username,
        keys: user.intrests,
      },
      "POST"
    )
      .then(({ data }) => {
        Toast.show("Post Shared", {
          duration: Toast.durations.LONG,
        });
      })
      .catch((err) => setLiked(false))
      .finally(() => {
        setOpenModal(false);
      });
  };
  useEffect(() => {
    let likeLength = 0;
    likes.forEach((element) => {
      if (!element.disliked) {
        likeLength++;
        if (element.user_uuid == user.uuid) {
          setLiked(true);
        }
      }
    });
    SetLikeCount(likeLength);
  }, []);

  return (
    <Box>
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        mt="10px"
        borderTopWidth="1"
        borderBottomWidth="1"
        borderColor="gray.200"
        px="3"
        py="2"
      >
        <Box>
          <Flex direction="row">
            <Pressable onPress={handleLike}>
              {liked ? (
                <AntDesign name="heart" size={18} color="#ff0000" p="2" />
              ) : (
                <AntDesign name="hearto" size={18} color="#000" p="2" />
              )}
            </Pressable>
            <View ml={2}>
              <FontAwesome5 name="comment" size={18} color="#000" p="2" />
            </View>

            <Pressable onPress={() => setOpenModal(true)} ml={2}>
              <FontAwesome5 name="share" size={18} color="#000" />
            </Pressable>
          </Flex>
          <Text fontSize="12px" fontWeight="800">
            {likeCount} Likes
          </Text>
        </Box>
        <Text fontSize="10px" fontWeight="800">
          {timeStamp}
        </Text>
      </Flex>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Share</Modal.Header>
          <Modal.Body>Do you want to share this post?</Modal.Body>
          <Modal.Footer>
            <Box display={"flex"} flexDir="row" justifyContent="flex-end">
              <Button onPress={handleShare} bg="primary" mr="2">
                Yes
              </Button>
              <Button onPress={() => setOpenModal(false)} bg="primary">
                No
              </Button>
            </Box>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Box>
  );
};

export default memo(LikeContainer);
