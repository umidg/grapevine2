import React, { useEffect, useState, useContext } from "react";
import {
  Box,
  View,
  Text,
  Button,
  Select,
  Flex,
  Image,
  Center,
  Spinner,
} from "native-base";
import { grapevineBackend } from "../../API";
import { UserValue } from "../../Context/UserContext";
import DropDownPicker from "react-native-dropdown-picker";

import { AtomComponents, Layout, PageComponent } from "../../Exports/index";
import GetAllFriends from "../../Hooks/Friend/getAllFriend";
import CreateChatroom from "../../Hooks/Friend/createChatroom";

const CreateGroup = ({ navigation }) => {
  const [user, setUser] = useContext(UserValue);
  const [groupMember, setGroupMember] = useState([]);
  const [groupName, setGroupName] = useState("");
  const { SignInLayout, BackLayout } = Layout;
  const { Input } = AtomComponents;
  const friends = GetAllFriends(user.uuid);
  const createChatroom = CreateChatroom();
  if (friends.isLoading) {
    return (
      <Center h="100%" w="100%">
        <Spinner />
      </Center>
    );
  }
  if (friends.isError) {
    return (
      <Center h="100%" w="100%">
        Error
      </Center>
    );
  }

  const createGroup = () => {
    if (groupName && groupMember.length > 0) {
      const users = groupMember.map((member) => {
        return { uuid: member.user_uuid };
      });
      createChatroom.mutate({ users: users, name: groupName });
    }
  };
  return (
    <BackLayout navigation={navigation} color="#000" safeArea>
      <Box h="100%" w="100%" bg="white" pb={10} px={"10%"}>
        <Text
          fontWeight="800"
          fontSize={16}
          textAlign="center"
          mb="5"
          fontFamily="bold"
        >
          Create Group
        </Text>
        <Box flex={1} pt={10}>
          <Text fontWeight="400" fontSize={"sm"} fontFamily="bold">
            Group Name:
          </Text>
          <Input
            color="#000"
            placeholder={"Group Name"}
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
          />
          <Text fontWeight="400" fontSize={"sm"} fontFamily="bold">
            Select Members:
          </Text>
          <Box>
            <Select
              selectedValue={""}
              width="100%"
              accessibilityLabel="Choose Service"
              placeholder="Choose Service"
              _selectedItem={{
                bg: "teal.600",
              }}
              mt={1}
              onValueChange={(itemValue) =>
                setGroupMember((member) => [itemValue, ...member])
              }
            >
              {friends.data.map((friend) => {
                return (
                  <Select.Item
                    key={friend.uuid}
                    label={
                      <Flex
                        direction="row"
                        justifyContent={"center"}
                        alignItems="center"
                      >
                        <Image
                          source={require("../../../assets/Images/1.png")}
                          height={10}
                          w={10}
                          alt={"image"}
                          borderRadius="full"
                        />
                        <Box>
                          <Text
                            fontWeight="400"
                            fontSize={"md"}
                            fontFamily="bold"
                          >
                            @ {friend.username}
                          </Text>
                          <Text
                            fontWeight="400"
                            fontSize={10}
                            fontFamily="bold"
                            ml={5}
                          >
                            {friend.fname + " " + friend.lname}
                          </Text>
                        </Box>
                      </Flex>
                    }
                    value={friend}
                  />
                );
              })}
            </Select>
          </Box>

          <Text
            fontWeight="800"
            fontSize={16}
            textAlign="center"
            mb="5"
            fontFamily="bold"
          >
            Members
          </Text>
          {groupMember.map((member) => {
            return (
              <Flex
                key={member.uuid}
                direction="row"
                justifyContent={"flex-start"}
                alignItems="center"
                m={2}
              >
                <Image
                  source={require("../../../assets/Images/1.png")}
                  height={10}
                  w={10}
                  alt={"image"}
                  borderRadius="full"
                />
                <Box ml={2}>
                  <Text fontWeight="400" fontSize={"md"} fontFamily="bold">
                    @ {member.username}
                  </Text>
                  <Text fontWeight="400" fontSize={10} fontFamily="bold" ml={5}>
                    {member.fname + " " + member.lname}
                  </Text>
                </Box>
              </Flex>
            );
          })}
        </Box>
        <Button bg="primary" onPress={createGroup}>
          Create
        </Button>
      </Box>
    </BackLayout>
  );
};

export default CreateGroup;
