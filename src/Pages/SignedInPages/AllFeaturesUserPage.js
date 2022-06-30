import {
  View,
  Text,
  Box,
  Flex,
  Center,
  Image,
  Spinner,
  Button,
  Pressable,
} from "native-base";
import React, { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import {
  MolecularComponents,
  Layout,
  AtomComponents,
  PageComponent,
} from "../../Exports/index";
import GetFeaturedUser from "../../Hooks/User/getFeaturedUser";
export default function AllFeaturesUserPage({ navigation }) {
  const [filter, setShowFilter] = useState(false);
  const { SignInLayout, BackLayout } = Layout;
  const {
    FeaturedUser: { Filter },
  } = PageComponent;
  const { RoundImage } = AtomComponents;
  const { DropDownMenu } = MolecularComponents;
  const [filterInformation, setFilterInformation] = useState({
    gender: undefined,
    intrests: undefined,
    address: "",
  });
  const featuredUsers = GetFeaturedUser({
    page: 1,
    limit: 10,
    filter: { ...filterInformation },
  });

  if (featuredUsers.isLoading || featuredUsers.isRefetching) {
    return (
      <Center h="100%" w="100%">
        <Spinner accessibilityLabel="Loading" />
      </Center>
    );
  }
  if (featuredUsers.isError || !featuredUsers.data) {
    return <Text>Error</Text>;
  }
  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box w="100%" h="100%" alignItems={"center"} bg="#fff">
        <Text fontWeight="800" fontSize={16} textAlign="center" mb="5">
          All Featurd Users
        </Text>
        {filter && (
          <Filter
            close={() => setShowFilter(false)}
            onChange={setFilterInformation}
            info={filterInformation}
            applyFilter={() => featuredUsers.refetch()}
          />
        )}
        <Flex
          direction="row"
          alignItems={"center"}
          justifyContent="center"
          p={3}
          borderWidth={1}
          borderColor="#d3d3d3"
        >
          <Box flex={1} borderRightWidth={1} borderRightColor="#d3d3d3">
            <DropDownMenu
              icon={
                <Text fontWeight={"800"} fontSize={16} textAlign="center">
                  SORT
                </Text>
              }
              options={[
                {
                  text: "Recommended",
                  icon: (
                    <Box h={2} w={2} bg="primary" borderRadius={"full"}></Box>
                  ),
                },
                { text: "Audience: Low to High" },
                { text: "Audience: High to Low" },
                { text: "Most Popular" },
              ]}
              textStyle={{
                textAlign: "left",

                width: "80%",
                padding: "2",
                borderBottomWidth: "1",
                borderBottomColor: "#d3d3d3",
              }}
            />
          </Box>
          <Box flex={1}>
            <Pressable onPress={() => setShowFilter(true)}>
              <Text fontWeight={"800"} fontSize={16} textAlign="center">
                FILTER
              </Text>
            </Pressable>
          </Box>
        </Flex>

        <>
          {featuredUsers.data.length > 0 ? (
            <Box width={"100%"}>
              <Text my={3} fontWeight="800" textAlign={"center"}>
                {featuredUsers.data?.length} Features found
              </Text>
              {featuredUsers.data.map((_user) => {
                return (
                  <Flex
                    direction="row"
                    // alignItems={"center"}
                    justifyContent="space-between"
                    key={_user.uuid}
                    m={2}
                  >
                    <Flex
                      direction="row"
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <RoundImage
                        image={require("../../../assets/Images/3.png")}
                        size={10}
                      />
                      <Box px={2}>
                        <Text fontWeight={"800"}>{_user.username}</Text>
                        <Text>{_user.fname + " " + _user.lname}</Text>
                      </Box>
                    </Flex>
                    <Flex
                      direction="row"
                      alignItems={"center"}
                      justifyContent="space-between"
                    >
                      <Button h="60%" pt="0" pb="0" bg="primary" mx={2}>
                        Connect
                      </Button>
                      <AntDesign name="plussquareo" size={28} color="black" />
                    </Flex>
                  </Flex>
                );
              })}
            </Box>
          ) : (
            <Center h="100%" w="100%">
              <Image
                source={require("../../../assets/Logo/Logo.png")}
                size={100}
                resizeMode="contain"
                p="5"
                alt="Image"
              />
              <Text fontSize="16" fontWidth="800" color="primary" mt="10">
                Sorry, Users Found.
              </Text>
            </Center>
          )}
        </>

        <Text></Text>
      </Box>
    </BackLayout>
  );
}
