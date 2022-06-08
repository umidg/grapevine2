import { View, Text, ScrollView } from "native-base";
import React, { useEffect, useContext, useState } from "react";
import { Pressable } from "react-native";
import { grapevineBackend } from "../../API";
// import Tiktokvideo from "../../AtomComponents/TiktokWebview/Tiktokvideo";
import { UserValue } from "../../Context/UserContext";
import { Tiktokvideo } from "../../AtomComponents/index";

const TiktokVideoConteiner = ({ onPress, selectedId }) => {
  const [videos, setVideos] = useState([]);
  const [user, setUser] = useContext(UserValue);
  const [err, setErr] = useState(false);
  useEffect(() => {
    grapevineBackend(
      "/post/userTikTokVideos",
      {
        user_id: user.id,
      },
      "POST"
    )
      .then(({ data }) => {
        if (data.status) {
          setVideos([...data.data]);
        } else {
          setErr(true);
        }
      })
      .catch((err) => {
        setErr(true);
      });
  }, []);

  return (
    <View h="100%" w="100%">
      <ScrollView>
        {videos.length > 0 &&
          videos.map((v) => (
            <View h={200} position="relative" key={v.id}>
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
          ))}
      </ScrollView>
    </View>
  );
};

export default TiktokVideoConteiner;
