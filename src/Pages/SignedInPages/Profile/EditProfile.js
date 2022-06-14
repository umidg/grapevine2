import {
  Box,
  Text,
  Center,
  TextArea,
  Flex,
  Button,
  Spinner,
} from "native-base";
import Toast from "react-native-root-toast";
import React, { useContext, useEffect, useState } from "react";
import { Layout, Hooks } from "../../../Exports/index";
import { UserValue } from "../../../Context/UserContext";
import { grapevineBackend } from "../../../API";
import AsyncStorage from "@react-native-async-storage/async-storage";
const EditProfile = (props) => {
  const { SignInLayout, BackLayout } = Layout;
  const { navigation } = props;
  const [user, setUser] = useContext(UserValue);
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(false);
  const update = () => {
    if (!loading) {
      setLoading(true);
      grapevineBackend(
        "/user/updateUser",
        { data: { description: description, about: about } },
        "POST"
      )
        .then(async ({ data }) => {
          setLoading(false);
          if (data.status) {
            setUser({ ...user, ...data.data });
            await AsyncStorage.setItem(
              "user",
              JSON.stringify({ ...user, ...data.data })
            );
            Toast.show("Success", {
              duration: Toast.durations.SHORT,
            });
            navigation.pop();
          }
        })
        .catch((err) => {
          setLoading(false);
          Toast.show("Error", {
            duration: Toast.durations.SHORT,
          });
        });
    }
  };
  useEffect(() => {
    setDescription(props.route.params.description);
    setAbout(props.route.params.about);
  }, []);

  return (
    <SignInLayout>
      <BackLayout navigation={props.navigation} color="#000">
        <Box
          flex={1}
          mx={5}
          my={20}
          flexDirection="column"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Box w="100%">
            <Box my={5}>
              <Text fontWeight={"800"} fontSize={16} color="primary" my={2}>
                Description
              </Text>
              <TextArea
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
            </Box>
            <Box my={5}>
              <Text fontWeight={"800"} fontSize={16} color="primary" my={2}>
                About
              </Text>
              <TextArea value={about} onChangeText={(text) => setAbout(text)} />
            </Box>
          </Box>
          <Button bg="primary" w="100%" onPress={update}>
            {loading ? (
              <Spinner accessibilityLabel="Loading posts" />
            ) : (
              "Update"
            )}
          </Button>
        </Box>
      </BackLayout>
    </SignInLayout>
  );
};

export default EditProfile;
