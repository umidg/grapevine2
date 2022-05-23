import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import Buttons from "./Buttons";
import { Text } from "native-base";
const Stats = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.dataContainer}>
          <Text style={styles.numbers} color="theme.txt">
            13
          </Text>

          <Text style={styles.text} color="theme.txt">
            Posts
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.dataContainer}>
          <Text style={styles.numbers} color="theme.txt">
            3,572
          </Text>
          <Text style={styles.text} color="theme.txt">
            Audience
          </Text>
        </View>
        <View style={styles.line}></View>
        <View style={styles.dataContainer}>
          <Text style={styles.numbers} color="theme.txt">
            500+
          </Text>
          <Text style={styles.text} color="theme.txt">
            Connections
          </Text>
        </View>
      </View>
      <View w="100%">
        <Text style={styles.bottomText} color="theme.txt">
          Top 5.8% of all creators
        </Text>
      </View>

      <Buttons />
    </View>
  );
};

export default Stats;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  dataContainer: {
    paddingLeft: 10,
    flexDirection: "column",
    flex: 1,
  },
  numbers: {
    fontSize: 22,
    fontWeight: "800",
    // fontFamily: "Gilroy",
  },
  text: {
    fontSize: 12,
    fontWeight: "300",
    // fontFamily: "Gilroy",
    textAlign: "left",
  },
  line: {
    backgroundColor: "#000",
    borderWidth: 0.5,
    borderStyle: "solid",
    borderColor: "#d9d9d9",
    height: "50%",
    alignSelf: "center",
  },
  bottomText: {
    fontSize: 10,
    color: "#000",
    fontWeight: "300",
    textAlign: "left",

    // fontFamily: "Gilroy",
  },
});
