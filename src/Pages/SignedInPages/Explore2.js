import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LeatherBoard from "../../Components/Explore2/LeatherBoard/LeatherBoard";
import { Box } from "native-base";
import Search from "../../AtomComponents/Input/Search";
import Tagged from "../../Components/Explore2/Tagged/Tagged";
import LayoutFrame from "../../Layout/LayoutFrame";
import Features from "../../Components/Explore2/Features/Features";
import Collection from "../../Components/Explore2/Collection/Collection";
const Explore2 = () => (
  <LayoutFrame>
    <Box h="100%" w="100%">
      <View>
        <View style={styles.searchContainer}>
          <Search />
        </View>
        <View style={styles.taggedContainer}>
          <Tagged />
        </View>
        <View style={styles.taggedContainer}>
          <Tagged />
        </View>
        <View style={styles.featuresContainer}>
          <Features />
        </View>
        <View style={styles.collectionsContainer}>
          <Collection />
        </View>
        <View style={styles.leatherBoardConainer}>
          <LeatherBoard />
        </View>
      </View>
    </Box>
  </LayoutFrame>
);

export default Explore2;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  searchContainer: { paddingLeft: 30, paddingRight: 30, marginTop: 20 },
  taggedContainer: { marginTop: 30 },
  leatherBoardConainer: { marginTop: 30 },
  featuresContainer: {
    marginTop: 30,
  },
  collectionsContainer: {
    marginTop: 30,
  },
});
