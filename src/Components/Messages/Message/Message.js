import React from "react";
import { View, Box, Flex, Text, Image } from "native-base";
import RoundImage from "../../../AtomComponents/Image/RoundImage";
import { TouchableHighlight } from "react-native";
const Message = ({ onPress, username }) => {
  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor="rgba(61,54,130,0.050980392156862744)"
    >
      <Flex
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        p="2%"
      >
        <Flex direction="row" alignItems="center">
          <Image
            source={require("../../../../assets/Images/1.png")}
            borderRadius="full"
            alt="Profile Image"
            h={60}
            w={60}
          />
          <View ml="2">
            <Text fontSize={"12"} fontWeight="800">
              {username}
            </Text>
            <Text ml="3" fontSize={"12"} fontWeight="300" color="#8f8f8f">
              Liked Your Message
            </Text>
          </View>
        </Flex>
        <View ml="2">
          <Text fontSize={"12"} fontWeight="800"></Text>
          <Text fontSize={"12"} fontWeight="300" color="#8f8f8f">
            5 min
          </Text>
        </View>
      </Flex>
    </TouchableHighlight>
  );
};

export default Message;
