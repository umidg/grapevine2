import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Spinner } from "native-base";
import { grapevineBackend } from "../../../API";
import { FeatureBoxSecondary } from "../../../MoleculeComponents/index";
const Features = () => {
  const [features, setFeatures] = useState(null);
  useEffect(() => {
    grapevineBackend("/user/getFeatured", {}, "POST")
      .then(({ data }) => {
        if (data.status) {
          setFeatures(data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Features</Text>
      <Text style={styles.secondaryText}>Creators</Text>
      {features ? (
        <View style={{ marginTop: 10 }}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {features.map((user) => (
              <FeatureBoxSecondary key={user.uuid} user={user} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <Spinner accessibilityLabel="Loading" color="primary" />
      )}
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
