import { StyleSheet } from "react-native";
import React from "react";
import { View, Text } from "native-base";
import RoundImage from "../../AtomComponents/Image/RoundImage";
import { Button } from "native-base";
const FeatureBoxSecondary = () => {
  return (
    <View
      w="120"
      ml="5"
      pt="2"
      pb="2"
      borderRadius="20"
      alignItems="center"
      bg="#fff"
      borderWidth="3"
      borderColor="rgba(81,98,241,0.5)"
      p="2"
    >
      <RoundImage size={30} image={require("../../../assets/Images/1.png")} />
      <Text style={styles.name}>Molly-Mae</Text>
      <Text style={styles.number}>65 +</Text>
      <Text style={styles.collab}>Collabs</Text>
      <Text style={styles.number}>500 +</Text>
      <Text style={styles.collab}>Connections</Text>
      <Text style={styles.number}>3,051</Text>
      <Text style={styles.collab}>Vouches</Text>

      <Button
        borderRadius={"full"}
        h="15"
        w="80%"
        bg="rgba(1,1,1,0)"
        borderWidth={1}
        borderColor=" rgba(81,98,241,0.5)"
        pt="0"
        pb="0"
        p="0"
        justifyContent={"center"}
        alignItems="center"
        mt="2"
      >
        <Text fontSize={8} color="#000">
          Connect
        </Text>
      </Button>
    </View>
  );
};

export default FeatureBoxSecondary;

const styles = StyleSheet.create({
  name: {
    fontSize: 11,
    color: "#000",
    fontWeight: "800",
  },
  number: {
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 2,
  },
  collab: {
    fontSize: 9,
    fontWeight: "300",
    textAlign: "center",
    lineHeight: 9,
  },
});
