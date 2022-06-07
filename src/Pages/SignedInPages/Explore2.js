import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Box } from "native-base";
import { SignInLayout } from "../../Layout/index";
import { Explore2 } from "../../Components/index";

import { Search } from "../../AtomComponents/index";
const Explore2Page = () => (
  <SignInLayout>
    <Box h="100%" w="100%">
      <View>
        <View style={styles.searchContainer}>
          <Search />
        </View>
        <View style={styles.taggedContainer}>
          <Explore2.Tagged />
        </View>
        <View style={styles.taggedContainer}>
          <Explore2.Tagged />
        </View>
        <View style={styles.featuresContainer}>
          <Explore2.Features />
        </View>
        <View style={styles.collectionsContainer}>
          <Explore2.Collection />
        </View>
        <View style={styles.leatherBoardConainer}>
          <Explore2.LeatherBoard />
        </View>
      </View>
    </Box>
  </SignInLayout>
);

export default Explore2Page;

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
