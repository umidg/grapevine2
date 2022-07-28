import {
  Box,
  Text,
  TextArea,
  Button,
  Spinner,
  Center,
  Flex,
  Row,
} from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Layout, Hooks } from "../../../Exports/index";
import { UserValue } from "../../../Context/UserContext";
import UpdateUser from "../../../Hooks/User/updateUser";
import { AtomComponents } from "../../../Exports/index";
const { Input } = AtomComponents;
const EditProfile = (props) => {
  const { SignInLayout, BackLayout } = Layout;
  const [user, setUser] = useContext(UserValue);
  const [description, setDescription] = useState("");
  const [about, setAbout] = useState("");
  const updateUser = UpdateUser();
  const update = () => {
    if (!updateUser.isLoading) {
      updateUser.mutate({
        data: { description: description, about: about },
        user_uuid: user.uuid,
      });
    }
  };

  useEffect(() => {
    setDescription(props.route.params.description);
    setAbout(props.route.params.about);
  }, []);

  return (
    <BackLayout navigation={props.navigation} color="#000">
      <SignInLayout>
        <Box
          flex={1}
          mx={5}
          my={10}
          flexDirection="column"
          alignItems="flex-start"
        >
          <Center w="100%">
            <Box
              h="85"
              w="85"
              borderRadius={"full"}
              borderWidth={3}
              borderColor="primary"
            ></Box>
            <Text fontWeight={"800"} color="primary" mt={1}>
              Change profile photo
            </Text>
          </Center>
          <Box w="100%">
            <Box borderTopWidth={"1"} borderTopColor="#d3d3d3">
              <Text fontSize={12} color="gray.600" fontWeight={"800"}>
                About You
              </Text>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Name :
                </Text>
                <Box flex={2} px={2}>
                  <Input />
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Username :
                </Text>
                <Box flex={2} px={2}>
                  <Input />
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Location :
                </Text>
                <Box flex={2} px={2}>
                  <Input />
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Bio :
                </Text>
                <Box flex={2} px={2}>
                  <Input />
                </Box>
              </Row>
            </Box>
            <Box borderTopWidth={"1"} borderTopColor="#d3d3d3">
              <Text fontSize={12} color="gray.600" fontWeight={"800"}>
                Social
              </Text>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Instagram:
                </Text>
                <Box flex={2} px={2}>
                  <Input />
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Youtube:
                </Text>
                <Box flex={2} px={2}>
                  <Input />
                </Box>
              </Row>
              <Row mt={2}>
                <Text fontSize={16} fontWeight="400" flex={1}>
                  Tiktok:
                </Text>
                <Box flex={2} px={2}>
                  <Input />
                </Box>
              </Row>
            </Box>

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
            {updateUser.isLoading ? (
              <Spinner accessibilityLabel="Loading posts" />
            ) : (
              "Update"
            )}
          </Button>
        </Box>
      </SignInLayout>
    </BackLayout>
  );
};

export default EditProfile;
