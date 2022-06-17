import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Flex, Pressable, Slide, Box, Text } from "native-base";
import { grapevineBackend } from "../../API";
import { userHook } from "../../Hooks";
import { AntDesign } from "@expo/vector-icons";
import {
  AtomComponents,
  MolecularComponents,
  Layout,
  PageComponent,
} from "../../Exports/index";

const ExplorePage = ({ navigation }) => {
  const {
    Explore: { Features, Collection },
  } = PageComponent;
  const { Search } = AtomComponents;
  const { Notification } = MolecularComponents;
  const [users, setUsers] = useState(null);
  const [focus, setFocus] = useState(false);
  const [history, setHistory] = useState(null);
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

  const profileClick = (username, user_uuid) => {
    setFocus(false);
    grapevineBackend("/history/create", { username: username }, "POST")
      .then(({ data }) => {
        if (data.status) {
          setHistory([data.data, ...history]);
        }
      })
      .catch((err) => console.log(err));
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
        <Search flex={1} onSearch={searchUser} onFocus={() => setFocus(true)} />
        {focus && (
          <Pressable onPress={() => setFocus(false)} alignSelf="center">
            <Text textAlign="center" fontSize="sm" pl="2">
              Cancel
            </Text>
          </Pressable>
        )}
      </Box>
      <ScrollView style={{ height: "100%" }}>
        {focus ? (
          <View w="100%" h="87%" bg="white">
            <View>
              {users
                ? users.map((person) => {
                    return (
                      <Notification
                        onPress={() => {
                          profileClick(person.username, person.uuid);
                        }}
                        key={person.uuid}
                        profileImage={require("../../../assets/Images/3.png")}
                        time=""
                        username={person.username}
                      />
                    );
                  })
                : history.map((_history) => {
                    console.log(_history);
                    return (
                      <Notification
                        onPress={() =>
                          navigation.navigate("FriendProfile", {
                            user_uuid: _history.user_uuid,
                          })
                        }
                        key={_history.uuid}
                        profileImage={require("../../../assets/Images/3.png")}
                        time=""
                        username={_history.username}
                      />
                    );
                  })}
            </View>
          </View>
        ) : (
          <>
            <View style={styles.featureContainer}>
              <Features />
            </View>

            <View style={styles.collectionContainer}>
              <Collection />
            </View>
          </>
        )}
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
