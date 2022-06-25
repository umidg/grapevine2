import {
  View,
  Text,
  Box,
  Flex,
  Center,
  Image,
  Spinner,
  Button,
} from "native-base";
import React, { useEffect, useState } from "react";
import { grapevineBackend } from "../../API";
import { AntDesign } from "@expo/vector-icons";
import {
  MolecularComponents,
  Layout,
  AtomComponents,
} from "../../Exports/index";
export default function AllCreatorPage({ navigation }) {
  const [creators, setCreators] = useState(null);
  const { SignInLayout, BackLayout } = Layout;
  const { RoundImage } = AtomComponents;
  const { DropDownMenu } = MolecularComponents;
  useEffect(() => {
    grapevineBackend("/user/getCreators?limit=20", {}, "POST")
      .then(({ data }) => {
        if (data.status) {
          setCreators([...data.data.result]);
        }
      })
      .catch((err) => {
        setCreators([]);
        console.log(error);
      });
  }, []);
  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box w="100%" h="100%" alignItems={"center"} bg="#fff">
        <Text fontWeight="800" fontSize={16} textAlign="center" mb="5">
          All Creators
        </Text>
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
            <Text fontWeight={"800"} fontSize={16} textAlign="center">
              FILTER
            </Text>
          </Box>
        </Flex>

        {creators ? (
          <>
            {creators.length > 0 ? (
              <Box width={"100%"}>
                <Text my={3} fontWeight="800" textAlign={"center"}>
                  {creators.length} creator found
                </Text>
                {creators.map((creator) => {
                  return (
                    <Flex
                      direction="row"
                      // alignItems={"center"}
                      justifyContent="space-between"
                      key={creator.uuid}
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
                          <Text fontWeight={"800"}>{creator.username}</Text>
                          <Text>{creator.fname + " " + creator.lname}</Text>
                        </Box>
                      </Flex>
                      <Flex
                        direction="row"
                        alignItems={"center"}
                        justifyContent="space-between"
                      >
                        <Button h="60%" pt="0" pb="0" bg="primary" mx={2}>
                          Collaborate
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
                  Sorry, Creator Found.
                </Text>
              </Center>
            )}
          </>
        ) : (
          <Center h="100%" w="100%">
            <Spinner accessibilityLabel="Loading" />
          </Center>
        )}
        <Text></Text>
      </Box>
    </BackLayout>
  );
}
