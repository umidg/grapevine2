import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import AllCreators from "../../../MoleculeComponents/Collection/AllCreators";
import CollectionContainer from "../../../MoleculeComponents/Collection/CollectionContainer";

const Collection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Collections</Text>
      <CollectionContainer />
      <View style={styles.CollectionContainer}>
        <AllCreators />
      </View>
    </View>
  );
};

export default Collection;

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  headerText: {
    fontSize: 21,
    color: "#000",
    // fontFamily: "Gilroy",
    fontWeight: "800",
    marginLeft: 10,
  },
  CollectionContainer: {
    width: "100%",
    justifyContent: "center",
    paddingLeft: 40,
    paddingRight: 40,
    marginTop: 10,
    marginBottom: 20,
  },
});
