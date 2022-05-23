import React, { useEffect } from "react";
import { Box, Center, Text, Image, Flex } from "native-base";
import PostHeader from "./PostComponents/PostHeader";
import CommentsContainer from "./PostComponents/CommentsContainer";
import LikeContainer from "./PostComponents/LikeContainer";
import Boohoo from "../../AtomComponents/Text/Boohoo";
import ColorWrapper from "../../AtomComponents/ColorWrapper/ColorWrapper";
const Post = () => {
  return (
    <Box w="100%" mt="2px">
      <Box p="2">
        <PostHeader />
      </Box>
      <Box w="100%">
        <Flex
          position="absolute"
          zIndex={3}
          direction="row"
          justifyContent="space-between"
          w="100%"
          pl="5"
          pr="5"
          mt="5"
        >
          <Boohoo fontSize={14} />
          <ColorWrapper>
            <Image
              h={18}
              w={18}
              source={require("../../../assets/Icons/Instagram_light.png")}
              alt="Insta Icon"
            />
          </ColorWrapper>
        </Flex>
        <Image
          w={"100%"}
          alt="Post Image"
          source={require("../../../assets/Images/2.png")}
        />
      </Box>
      <Box pl="3" pr="3">
        <LikeContainer />
      </Box>
      <Box p="2">
        <CommentsContainer />
      </Box>
    </Box>
  );
};

export default Post;
