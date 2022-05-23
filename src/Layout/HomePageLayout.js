import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { Box } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
const HomePageLayout = (props) => {
  return (
    <View style={styles.container}>
      {/* <Box
        w="100%"
        h="50"
        bg="#fff"
        zIndex={4}
        opacity={0.9}
        position="absolute"
      ></Box> */}

      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(255,255,255,0.9)", "rgba(255,255,255,0)", "transparent"]}
        style={{ height: 80, width: "100%", position: "absolute", zIndex: 5 }}
      />
      <ScrollView
        fadingEdgeLength={100}
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

export default HomePageLayout;

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
