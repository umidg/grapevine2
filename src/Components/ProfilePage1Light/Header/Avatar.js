import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Image } from "native-base";
import RoundImage from "../../../AtomComponents/Image/RoundImage";
const Avatar = () => {
  return (
    <View>
      {/* <Image
        style={style.avatar}
        source={require("../../../assets/Images/Avatar.png")}
      /> */}
      <RoundImage
        size={85}
        image={require("../../../../assets/Images/Avatar.png")}
      />

      <Text style={style.profileName} color="theme.txt">
        Molly-Mae Hague
      </Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {},
  avatar: {
    height: 85,
    width: 85,
  },
  profileName: {
    fontSize: 13,
    fontWeight: "800",
    // fontFamily: "Gilroy",
    marginTop: 10,
  },
});

export default Avatar;
