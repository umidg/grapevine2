import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Flex, Pressable, Slide, Box, Text } from "native-base";
import { grapevineBackend } from "../../API";
import { FontAwesome } from "@expo/vector-icons";
import {
  AtomComponents,
  MolecularComponents,
  Layout,
  PageComponent,
} from "../../Exports/index";
import { ButtonDark, RoundImage } from "../../AtomComponents";
import { UserValue } from "../../Context/UserContext";

const ExplorePage = ({ navigation }) => {
  const {
    Explore: { Features, Collection, Resources },
  } = PageComponent;
  const { Search } = AtomComponents;
  const { Notification } = MolecularComponents;
  const [users, setUsers] = useState(null);
  const [focus, setFocus] = useState(false);
  const [history, setHistory] = useState([]);
  const [user, setUser] = useContext(UserValue);
  const searchUser = async (name) => {
    if (name.length > 2) {
      grapevineBackend("/auth/search", { name: name }, "POST")
        .then(async ({ data }) => {
          if (data.status) {
            setUsers([...data.data]); //TODO: Bipul only show profile of unblocked
          }
        })
        .catch((err) => console.log(err));
    } else {
      setUsers(null);
    }
  };
  const createHistory = async (username, search_user_uuid = "") => {
    grapevineBackend(
      "/history/create",
      { username: username, search_user_uuid: search_user_uuid },
      "POST"
    )
      .then(({ data }) => {
        console.log(data, "histpry");
        if (data.status) {
          setHistory([data.data, ...history]);
        }
      })
      .catch((err) => console.log(err));
  };
  const profileClick = async (username, user_uuid) => {
    setFocus(false);
    const new_history = await createHistory(username, user_uuid);
    navigation.navigate("FriendProfile", {
      user_uuid: user_uuid,
    });
  };

  useEffect(() => {
    grapevineBackend("/history/get", {}, "POST")
      .then(({ data }) => {
        if (data.status) {
          setHistory([...data.data.result]);
        }
      })
      .catch((err) => console.log(err));
    return () => setFocus(false);
  }, []);
  return (
    <Box h="100%" w="100%" bg="white">
      <Box display="flex" flexDir="row" justifyContent="space-between" p="3">
        <Search
          flex={1}
          onSearch={searchUser}
          onFocus={() => setFocus(true)}
          createHistory={createHistory}
          clearText={focus}
        />
        {focus && (
          <Pressable onPress={() => setFocus(false)} alignSelf="center">
            <Text textAlign="center" fontSize="sm" pl="2">
              Cancel
            </Text>
          </Pressable>
        )}
      </Box>
      <ScrollView style={{ height: "100%" }}>
        {focus && (
          <View w="100%" h="87%">
            {users ? (
              users.map((person) => {
                return (
                  <Pressable
                    key={person.uuid}
                    onPress={() => {
                      profileClick(person.username, person.uuid);
                    }}
                  >
                    <Flex
                      direction="row"
                      justifyContent={"flex-start"}
                      alignItems="center"
                      px={5}
                    >
                      <RoundImage
                        image={require("../../../assets/Images/3.png")}
                        size={10}
                      />
                      <Text fontSize={18} fontWeight="600" ml={2}>
                        {"@" + person.username}
                      </Text>
                    </Flex>
                  </Pressable>
                );
              })
            ) : (
              <Box px="2" width="full">
                <Box flex="1" flexDir="row" justifyContent="space-between">
                  <Text fontWeight="700" fontSize="xl" textAlign="center">
                    Recent
                  </Text>

                  <Text fontSize="sm" textAlign="center">
                    See all
                  </Text>
                </Box>
                {history.map((_history) => {
                  if (_history.search_user_uuid)
                    return (
                      <Pressable
                        key={_history.uuid}
                        onPress={() => {
                          profileClick(
                            _history.username,
                            _history.search_user_uuid
                          );
                        }}
                      >
                        <Flex
                          direction="row"
                          justifyContent={"flex-start"}
                          alignItems="center"
                          p="3"
                        >
                          <RoundImage
                            image={require("../../../assets/Images/3.png")}
                            size={8}
                          />
                          <Text fontSize={18} fontWeight="600" ml={2}>
                            {"@" + _history.username}
                          </Text>
                        </Flex>
                      </Pressable>
                    );
                  else
                    return (
                      <Box
                        key={_history.uuid}
                        flex="1"
                        flexDir="row"
                        justifyContent="flex-start"
                      >
                        <Box
                          borderWidth="1"
                          borderColor="gray.300"
                          rounded="full"
                          m="2"
                          p="3"
                        >
                          <FontAwesome name="search" size={20} color="gray" />
                        </Box>
                        <Box
                          alignContent="center"
                          alignItems="center"
                          my="auto"
                        >
                          <Text textAlign="center">{_history.username}</Text>
                        </Box>
                      </Box>
                    );
                })}
              </Box>
            )}
          </View>
        )}
        <Box height={focus ? "0" : "auto"} mb="24">
          {user.engagement_type == "Brand" && (
            <ButtonDark onPress={() => navigation.navigate("AllCreatorPage")}>
              All Creator
            </ButtonDark>
          )}
          <ButtonDark onPress={() => navigation.navigate("AllCreatorPage")}>
            All Creator
          </ButtonDark>
          <View style={styles.featureContainer}>
            <Features type="User" navigation={navigation} />
          </View>

          <Resources />
          <Features type="Brand" navigation={navigation} />

          {/* 
          <View style={styles.collectionContainer}>
            <Collection />
          </View> */}
        </Box>
      </ScrollView>
    </Box>
  );
};

export default ExplorePage;

const styles = StyleSheet.create({
  searchContainer: { paddingLeft: 30, paddingRight: 30, marginTop: 30 },
  filterContainer: { marginTop: 10, paddingLeft: 30, paddingRight: 30 },
  collectionContainer: {
    marginTop: 10,
  },
  featureContainer: {
    marginTop: 10,
  },
});
