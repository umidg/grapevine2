import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Boohoo from "../../../AtomComponents/Text/Boohoo";

const Photo = ({ index }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Boohoo fontSize={8} />
        <Image
          style={styles.logo}
          source={require("../../../../assets/Icons/Instagram_light.png")}
        />
      </View>
      <Image
        style={styles.image}
        source={require("../../../../assets/Images/9.png")}
        resizeMode="stretch"
      />
    </View>
  );
};

export default Photo;

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 120,
    width: Dimensions.get("window").width / 3 - 3,
  },
  logoContainer: {
    position: "absolute",
    width: "100%",
    height: 25,
    zIndex: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  textContainer: {
    borderRadius: 2,
    backgroundColor:
      "linear-gradient(90deg, #5162f1 0%, rgba(121, 73, 231,1) 100%)",
  },
  text: {
    fontSize: 8,
    color: "#fff",
    fontWeight: "800",
    // fontFamily: "Gilroy",
  },
  logo: {
    height: 18,
    width: 18,
  },
});
