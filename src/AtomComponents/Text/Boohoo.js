import { StyleSheet } from "react-native";
import React from "react";
import { Text, View } from "native-base";

const Boohoo = ({ fontSize }) => {
  return (
    <View style={[styles.textContainer]} borderRadius="md">
      <Text style={[styles.text, { fontSize: fontSize ? fontSize : 8 }]}>
        Boohoo
      </Text>
    </View>
  );
};

export default Boohoo;

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor:
      "linear-gradient(90deg, #5162f1 0%, rgba(121, 73, 231,1) 100%)",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    fontWeight: "800",
  },
});
