import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";

const LayoutFrame = (props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
        style={styles.scrollView}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {props.children}
        </View>
      </ScrollView>
    </View>
  );
};

export default LayoutFrame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    height: "100%",
    width: "100%",
  },
});
