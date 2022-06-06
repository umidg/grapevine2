import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View } from "native-base";
import { Box, Text, Flex, Image } from "native-base";
import Search from "../../AtomComponents/Input/Search";
import { SignInLayout } from "../../Layout/index";
import Box1 from "../../MoleculeComponents/ExploreBox/Box1";

const data = [1, 2, 3, 4, 5, 6];
const Explore3 = () => (
  <SignInLayout>
    <Box h="100%" w="100%" mb={70}>
      <View>
        <View px={30} mt={10}>
          <Search />
        </View>
        <View mt={30}>
          <Text fontSize={22} fontWeight="800" ml={3} mb={1}>
            Posts
          </Text>
          <Flex direction="row" justifyContent="space-around">
            <Image
              width={"24%"}
              height={100}
              source={require("../../../assets/Images/1.png")}
              alt="image"
            />
            <Image
              width={"24%"}
              height={100}
              source={require("../../../assets/Images/2.png")}
              alt="image"
            />
            <Image
              width={"24%"}
              height={100}
              source={require("../../../assets/Images/3.png")}
              alt="image"
            />
            <Image
              width={"24%"}
              height={100}
              source={require("../../../assets/Images/4.png")}
              alt="image"
            />
          </Flex>
        </View>
        <View mt={30}>
          <Text fontSize={22} fontWeight="800" ml={3} mb={1}>
            Featured
          </Text>
          <Text fontSize={12} fontWeight="800" ml={5} mb={1}>
            Creators
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {data.map((d) => (
              <Box1 key={d} />
            ))}
          </ScrollView>
        </View>
      </View>
    </Box>
  </SignInLayout>
);

export default Explore3;
