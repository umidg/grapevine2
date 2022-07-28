import React, { useState } from "react";
import {
  Button,
  Input,
  View,
  Flex,
  Box,
  Text,
  Image,
  Center,
} from "native-base";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
const Product = ({ products, setProducts }) => {
  const [productName, setProductName] = useState("");

  const addProduct = () => {
    if (productName) {
      setProducts((p) => [{ name: productName }, ...p]);
      setProductName("");
    }
  };
  const removeProduct = (index) => {
    let _products = [...products];
    _products.splice(index, 1);
    setProducts([..._products]);
  };
  return (
    <View py={5}>
      <Flex
        direction="row"
        justifyContent={"flex-start"}
        alignItems="center"
        // bg="green.400"
      >
        <Flex
          flex={2}
          direction="column"
          justifyContent="flex-start"
          alignItems={"center"}
          height={"100%"}
          // pt={1}
        >
          <Text
            fontWeight={"800"}
            fontSize={12}
            fontFamily="light"
            width={"100%"}
            textAlign="center"
          >
            Product Photo
          </Text>
          <Center h="20" w="20" bg="gray.200" borderRadius={"md"} mt={1}>
            <Entypo name="plus" size={42} color="#d3d3d3" />
          </Center>
        </Flex>
        <Flex
          direction="column"
          justifyContent={"center"}
          alignItems="center"
          flex={4}
        >
          <Text
            fontWeight={"800"}
            fontSize={12}
            fontFamily="light"
            width={"100%"}
            textAlign="left"
          >
            Product Name
          </Text>
          <Input placeholder="" h={8} bg={"gray.200"} />
          <Text
            fontWeight={"800"}
            fontSize={12}
            fontFamily="light"
            width={"100%"}
            textAlign="left"
            mt={2}
          >
            Product Link
          </Text>
          <Input
            placeholder="http://..."
            value={productName}
            onChangeText={(text) => setProductName(text)}
            h={8}
            bg={"gray.200"}
          />
          <Button bg="primary" my={5} borderRadius="md" onPress={addProduct}>
            Add
          </Button>
        </Flex>
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
              <Text fontWeight={"400"}>{_product.name}</Text>
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
