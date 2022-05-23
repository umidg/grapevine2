import React from "react";
import { View, Text, Box, Center, ScrollView } from "native-base";
import PostV2 from "../../../MoleculeComponents/Post/PostV2";
import { ActivityIndicator } from "react-native";

const PostContainer = ({ textPost, user }) => {
  return (
    <Center w="100%" bg="theme.bg">
      <Box w="90%" h="100%">
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {textPost.length > 0 ? (
            <Box pb="70">
              {textPost.map((d) => {
                return <PostV2 key={d.id} data={d} user={user} />;
              })}
            </Box>
          ) : (
            <Center h="100%" w="100%">
              <Text>No Post to show</Text>
            </Center>
          )}
        </ScrollView>
      </Box>
    </Center>
  );
};

export default PostContainer;
