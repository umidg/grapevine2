import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { FeatureBoxSecondary } from "../../../MoleculeComponents/index";
const Features = () => {
  const tempData1 = [1, 2, 3, 4, 5, 6];
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Features</Text>
      <Text style={styles.secondaryText}>Creators</Text>

      <View style={{ marginTop: 10 }}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {tempData1.map((data) => (
            <FeatureBoxSecondary key={data} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default Features;

const styles = StyleSheet.create({
  container: {},
  headerText: {
    fontSize: 21,
    color: "#000",
    // fontFamily: "Gilroy",
    fontWeight: "800",
    marginLeft: 10,
  },
  secondaryText: {
    fontSize: 16,
    fontWeight: "300",
    marginLeft: 20,
  },
});
