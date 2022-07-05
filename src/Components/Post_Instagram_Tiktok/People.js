import React, { useState } from "react";
import { Button, Input, View, Flex, Box, Text, Image } from "native-base";
import { Pressable } from "react-native";

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
      <Flex direction="column" justifyContent={"center"} alignItems="center">
        <Input
          placeholder="http://..."
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
