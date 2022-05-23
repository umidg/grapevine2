import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AllCreators from "../../../MoleculeComponents/Collection/AllCreators";
import CollectionContainer from "../../../MoleculeComponents/Collection/CollectionContainer";

const Collection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Our Collections</Text>
      <CollectionContainer />
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 21,
    color: "#000",
    // fontFamily: "Gilroy",
    fontWeight: "800",
    marginLeft: 10,
  },
});
