import React from "react";
import { Box, View, Flex, Text, Image } from "native-base";
import { TouchableOpacity } from "react-native";
const Header = ({ goBack }) => {
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      pr="5"
      pl="5"
    >
      <TouchableOpacity onPress={goBack}>
        <Image
          source={require("../../../../assets/Icons/back_dark.png")}
          alt="back"
          h="5"
          w="5"
        />
      </TouchableOpacity>

      <Text fontSize={14} fontWeight="800">
        Messages
      </Text>
      <Image
        source={require("../../../../assets/Icons/add_dark.png")}
        alt="add"
        h="5"
        w="5"
      />
    </Flex>
  );
};

export default Header;
