import { View, Text, ScrollView, Center, Box } from "native-base";
import React, { useEffect, useContext, useState } from "react";
import { Pressable } from "react-native";
import { grapevineBackend } from "../../API";
// import Tiktokvideo from "../../AtomComponents/TiktokWebview/Tiktokvideo";
import { UserValue } from "../../Context/UserContext";
import { Tiktokvideo } from "../../AtomComponents/index";

const TiktokVideoConteiner = ({ onPress, selectedId }) => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useContext(UserValue);
  useEffect(() => {
    grapevineBackend(
      "/post/userTikTokVideos",
      {
        user_uuid: user.uuid,
      },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
          setVideos([...data.data]);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View h="100%" w="100%">
      {videos.length > 0 ? (
        videos.map((v) => (
          <ScrollView key={v.uuid}>
            <View h={200} position="relative">
              <Pressable
                onPress={() => {
                  onPress(v);
                }}
              >
                <View
                  h="100%"
                  w="100%"
                  zIndex={2000}
                  position="absolute"
                  bg={selectedId == v.id ? "#ffffffaa" : "#ffffff00"}
                ></View>
                <Tiktokvideo uri={v.embed_link} h={"100%"} />
              </Pressable>
            </View>
          </ScrollView>
        ))
      ) : (
        <Box h="100%">
          <Text
            color="primary"
            fontWeight={"800"}
            fontSize={20}
            textAlign="center"
            mt={10}
          >
            No TikTokVideos
          </Text>
        </Box>
      )}
    </View>
  );
};

export default TiktokVideoConteiner;
