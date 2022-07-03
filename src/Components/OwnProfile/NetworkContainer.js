import React, { useState } from "react";
import { Text, Box, Link } from "native-base";
import { RegularImage } from "../../AtomComponents/index";
import { Pressable } from "react-native";
import Toast from "react-native-root-toast";

const NetworkContainer = ({ setShowTiktokModal, user }) => {
  const tiktokLogin = () => {};
  return (
    <Box>
      <Text textAlign="center" fontWeight="bold">
        {`Your Network`}
      </Text>
      <Box flex="1" flexDir="row" justifyContent="center">
        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Logo/logo(1).png")}
        />
        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Icons/instagram_color.png")}
        />
        {user.tiktok ? (
          <Pressable
            onPress={() => {
              Toast.show("Already Connected", {
                duration: Toast.durations.SHORT,
              });
            }}
          >
            <RegularImage
              h={20}
              w={20}
              image={require("../../../assets/Icons/TikTok.png")}
            />
          </Pressable>
        ) : (
          <Link
            href={`https://admin.grapevine-app.co/tiktok/login/${user.uuid}`}
          >
            <RegularImage
              h={20}
              w={20}
              image={require("../../../assets/Icons/TikTok.png")}
            />
          </Link>
        )}

        <RegularImage
          h={20}
          w={20}
          image={require("../../../assets/Icons/youtube_color.png")}
        />
      </Box>

      <Box>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default NetworkContainer;
