import React, { useState } from "react";
import { Text, Box } from "native-base";
import { RegularImage } from "../../AtomComponents/index";
import { Pressable } from "react-native";
import Toast from "react-native-root-toast";

const NetworkContainer = ({ setShowTiktokModal, user }) => {
  return (
    <Box>
      <Text textAlign="center" fontWeight="bold" italic>
        Molly's Networks
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
        <Pressable
          onPress={() => {
            if (user.tiktok) {
              Toast.show("Already Connected", {
                duration: Toast.durations.SHORT,
              });
            } else {
              setShowTiktokModal(true);
            }
          }}
        >
          <RegularImage
            h={20}
            w={20}
            image={require("../../../assets/Icons/TikTok.png")}
          />
        </Pressable>
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
