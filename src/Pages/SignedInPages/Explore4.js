import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "native-base";
import { Box, Text, Flex, Image } from "native-base";
import Search from "../../AtomComponents/Input/Search";
import LayoutFrame from "../../Layout/LayoutFrame";
import Box2 from "../../MoleculeComponents/ExploreBox/Box2";
import Features from "../../Components/Explore/Featurs/Features";
const data = [1, 2, 3, 4, 5, 6];
const Explore4 = () => (
  <LayoutFrame>
    <Box h="100%" w="100%" mb={70}>
      <View>
        <View pl={30} pr={30} mt={20}>
          <Search />
        </View>

        <View mt={30}>
          <Text fontSize={22} fontWeight="800" ml={3} mb={1}>
            Resources
          </Text>
          <Text fontSize={16} fontWeight="800" ml={5} mb={1}>
            Engagement
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((d) => (
              <Box2 key={d} />
            ))}
          </ScrollView>
          <Text fontSize={16} fontWeight="800" ml={5} mb={1}>
            Content Creation
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((d) => (
              <Box2 key={d} />
            ))}
          </ScrollView>
        </View>
        <View mt={30}>
          <Features />
        </View>
      </View>
    </Box>
  </LayoutFrame>
);

export default Explore4;
