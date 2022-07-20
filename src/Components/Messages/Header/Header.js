import React from "react";
import { Flex, Text, Image, Pressable } from "native-base";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const Header = ({ goBack }) => {
  const navigation = useNavigation();
  return (
    <Flex
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      pr="5"
      pl="5"
    >
      <TouchableOpacity onPress={goBack}>
        <AntDesign name="arrowleft" size={30} color="black" />
      </TouchableOpacity>

      <Text fontSize={14} fontWeight="800">
        Messages
      </Text>
      <Pressable onPress={() => navigation.navigate("CreateGroup")}>
        <Image
          alt="image"
          source={require("../../../../assets/Icons/add_dark.png")}
          h="5"
          w="5"
        />
      </Pressable>
    </Flex>
  );
};

export default Header;
