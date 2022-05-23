import React from "react";
import { StyleSheet } from "react-native";
import Avatar from "./Avatar";
import Stats from "./Stats";
import TopUserText from "./TopUserText";
import { View, Text } from "native-base";

const HeaderContainer = () => {
  return (
    <View style={style.contianer}>
      <Text>{}</Text>
      <View style={style.useInfoRow}>
        <View style={style.avatarWrapper}>
          <Avatar />
        </View>
        <View style={style.statsWrapper}>
          <Stats />
        </View>
      </View>
      <View pl="5%" pr="5%" mt="3">
        <Text fontSize="11" color="#8f8f8f" fontWidth="300">
          is simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industrycenturies, but also the leap into
          electronic typesetting, has been the industrycenturies, but als has
          been the industrycenrem… more
        </Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  contianer: {},
  useInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: "5%",
    paddingRight: "5%",
  },
  avatarWrapper: {
    flex: 1,
    alignItems: "center",
  },
  statsWrapper: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HeaderContainer;
