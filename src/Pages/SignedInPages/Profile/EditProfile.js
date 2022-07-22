import { Box, Text, TextArea, Button, Spinner } from "native-base";
import React, { useContext, useEffect, useState } from "react";
import { Layout, Hooks } from "../../../Exports/index";
import { UserValue } from "../../../Context/UserContext";
import UpdateUser from "../../../Hooks/User/updateUser";
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
            {updateUser.isLoading ? (
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
