import React, { useState } from "react";
import { Button, Input, View, Flex, Box, Text, Image } from "native-base";
import { Pressable } from "react-native";

const Product = ({ products, setProducts }) => {
  const [productName, setProductName] = useState("");

  const addProduct = () => {
    if (productName) {
      setProducts((p) => [{ name: productName }, ...p]);
      setProductName("");
    }
  };
  const removeProduct = (index) => {
    setProducts((p) => [...p].splice(index, 1));
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
          <Text fontWeight={"400"}>{" " + products.length} products</Text>
        </Text>
      </Box>
      {products.map((_product, index) => {
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
            <Box flex={4} px={2}>
              <Text fontWeight={"400"}>{_product}</Text>
              <Text fontWeight={"800"}>$25</Text>
            </Box>
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

export default Product;
