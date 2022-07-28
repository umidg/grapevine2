import React, { useState } from "react";
import {
  Button,
  Input,
  View,
  Flex,
  Box,
  Text,
  Image,
  Select,
} from "native-base";
import { Pressable } from "react-native";
import { DropDownMenu } from "../../MoleculeComponents";

const People = ({ persons, setPersons }) => {
  const [productName, setProductName] = useState("");

  const addProduct = () => {
    if (productName) {
      setPersons((p) => [productName, ...p]);
      setProductName("");
    }
  };
  const removeProduct = (index) => {
    setPersons((p) => [...p].splice(index, 1));
  };
  return (
    <View py={5}>
      <Flex
        direction="column"
        justifyContent={"center"}
        alignItems="flex-start"
      >
        <Text
          fontWeight={"800"}
          fontSize={12}
          fontFamily="light"
          width={"100%"}
          textAlign="left"
        >
          Network
        </Text>
        <Select
          bg="gray.200"
          borderRadius={"md"}
          fontFamily="bold"
          height="10"
          width={"30%"}
          selectedValue={"Instagram"}
          color={"#000"}
          fontWeight="800"
          accessibilityLabel="Choose "
          placeholder="Choose "
          _selectedItem={{
            bg: "gray.200",
          }}
          borderWidth="0"
          mt={1}
          onValueChange={(itemValue) => {}}
        >
          <Select.Item label={"Instagram"} value={"Instagram"} />
          <Select.Item label={"Tiktok"} value={"Tiktok"} />
          <Select.Item label={"Youtube"} value={"Youtube"} />
        </Select>
        <Text
          fontWeight={"800"}
          fontSize={12}
          fontFamily="light"
          width={"100%"}
          textAlign="left"
          mt={2}
        >
          Role
        </Text>
        <Input
          h={8}
          bg={"gray.200"}
          placeholder="Search"
          value={productName}
          onChangeText={(text) => setProductName(text)}
          w={"30%"}
        />
        <Text
          fontWeight={"800"}
          fontSize={12}
          fontFamily="light"
          width={"100%"}
          textAlign="left"
          mt={2}
        >
          Instagram Profile Link
        </Text>
        <Input
          h={8}
          bg={"gray.200"}
          placeholder="Search"
          value={productName}
          onChangeText={(text) => setProductName(text)}
        />
        <Button bg="primary" my={5} borderRadius="md" onPress={addProduct}>
          Add
        </Button>
      </Flex>
      <Box borderBottomColor={"#d3d3d3"} borderBottomWidth={1}>
        <Text fontWeight={"800"} fontSize={16} fontFamily="light">
          Total:
          <Text fontWeight={"400"}>{" " + persons.length} products</Text>
        </Text>
      </Box>
      {persons.map((_people, index) => {
        return (
          <Flex
            direction="row"
            justifyContent={"flex-start"}
            alignItems="center"
            p={1}
            key={index}
            borderBottomColor={"#d3d3d3"}
            borderBottomWidth={1}
          >
            <Image
              source={require("../../../assets/Images/2.png")}
              alt="img"
              h={"20"}
              w={"20"}
              flex={1}
            />

            <Pressable onPress={() => removeProduct(index)}>
              <View bg="red.600" py={1} px={1} borderRadius="md">
                <Text color="white" fontWeight={"800"}>
                  Remove
                </Text>
              </View>
            </Pressable>
          </Flex>
        );
      })}
    </View>
  );
};

export default People;
