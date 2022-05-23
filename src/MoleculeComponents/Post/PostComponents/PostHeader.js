import React, { useState } from "react";
import { Box, Center, Text, Flex, View, Image, Pressable } from "native-base";
import { TouchableOpacity, StyleSheet } from "react-native";
import RegularImage from "../../../AtomComponents/Image/RegularImage";
import RoundImage from "../../../AtomComponents/Image/RoundImage";
import OptionDark from "../../../../assets/Icons/Options.png";

const PostHeader = ({ username, user_id, navigation }) => {
  const [showReport, setShowReport] = useState(false);
  return (
    <Flex
      direction="row"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Flex direction="row" alignItems="center">
        <Pressable
          onPress={() => {
            if (navigation)
              navigation.navigate("FriendProfile", {
                user_id: user_id,
              });
          }}
        >
          <RoundImage
            size={30}
            image={require("../../../../assets/Images/1.png")}
          />
        </Pressable>
        <Text fontSize="16px" fontWeight="600">
          {"  "}@{username ? username : "mollymae"}
        </Text>
        {/* <View style={style.verifiedContainer}>
          <Image
            style={style.tickIcon}
            source={require("../../../../assets/Icons/Tick.png")}
            alt="icon"
          />
        </View> */}
      </Flex>
      {showReport && (
        <Box
          position={"absolute"}
          top={8}
          right={-5}
          w="20%"
          py={2}
          alignItems={"center"}
          borderWidth="1"
          borderColor={"#d3d3d3"}
        >
          <Text>Report</Text>
        </Box>
      )}
      <Pressable onPress={() => setShowReport(!showReport)}>
        <RegularImage h={15} w={15} image={OptionDark} />
      </Pressable>
    </Flex>
  );
};

const style = StyleSheet.create({
  verifiedContainer: {
    height: 13,
    width: 13,
    borderRadius: 3,
    backgroundColor:
      "gradient(90deg, rgba(81,98,241,1) 0%, rgba(121,73,231,1) 100%)",
    justifyContent: "center",
    alignItems: "center",
  },
  tickIcon: {
    position: "relative",
    height: 13,
    width: 13,
  },
});
export default PostHeader;
