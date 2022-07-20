import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Flex } from "native-base";
import Photo from "./photo";
import Tiktokvideo from "../../../AtomComponents/TiktokWebview/Tiktokvideo";
export default function PhotosContainer({ tiktokPost }) {
  return (
    <Flex direction="row" justifyContent={"flex-start"} flexWrap="wrap" mt={1}>
      {tiktokPost.length > 0 ? (
        tiktokPost.map((post) => {
          return (
            <View w="50%" key={post.embed_link} p={2}>
              <Tiktokvideo uri={post.embed_link} />
            </View>
          );
        })
      ) : (
        <Text textAlign={"center"} w="100%">
          No Videos
        </Text>
      )}
    </Flex>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  box: {
    padding: 1,
  },
});
