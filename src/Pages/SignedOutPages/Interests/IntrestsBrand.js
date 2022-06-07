import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Flex, Center } from "native-base";
import { Box } from "native-base";

import { RegisterData } from "../../../Context/RegisterContext";

import { AtomComponents, Layout } from "../../../Exports/index";

const InterestsBrand = ({ navigation }) => {
  const { ButtonDark, InputIntrests, Logo } = AtomComponents;
  const { LayoutFrame, BackLayout, LoginLayout } = Layout;

  const [showInput, setShowInput] = useState(false);
  const [inputData, setInputData] = useState("");
  const [data, setData] = useContext(RegisterData);

  const select = (tag) => {
    let index = data.intrests.indexOf(tag);
    let temp = data.intrests;
    if (index == -1) {
      temp.push(tag);
    } else {
      temp.splice(index, 1);
    }
    setData({ ...data, intrests: temp });
  };

  return (
    <LayoutFrame>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box style={styles.contaienr}>
            <View>
              <View style={styles.logoContainer}>
                <Logo />
                <Text style={styles.headerText}>
                  What is the nature of your brand?
                </Text>
                <Text style={styles.headerText2}>
                  We’ll personalise your expreience based on your answers
                </Text>
              </View>
              <View style={styles.body}>
                <Flex direction="row" justifyContent="space-around" w="100%">
                  <ButtonDark
                    h={10}
                    w="30%"
                    onPress={() => select("Fashion")}
                    bg={
                      data.intrests && data.intrests.indexOf("Fashion") != -1
                        ? "buttonDarkClick"
                        : "buttonDark"
                    }
                  >
                    <Text style={styles.buttonText}>Fashion</Text>
                  </ButtonDark>
                  <ButtonDark
                    h={10}
                    w="30%"
                    onPress={() => select("Beauty")}
                    bg={
                      data.intrests && data.intrests.indexOf("Beauty") != -1
                        ? "buttonDarkClick"
                        : "buttonDark"
                    }
                  >
                    <Text style={styles.buttonText}>Beauty</Text>
                  </ButtonDark>
                  <ButtonDark
                    h={10}
                    w="30%"
                    onPress={() => select("Fitness")}
                    bg={
                      data.intrests && data.intrests.indexOf("Fitness") != -1
                        ? "buttonDarkClick"
                        : "buttonDark"
                    }
                  >
                    <Text style={styles.buttonText}>Fitness</Text>
                  </ButtonDark>
                </Flex>
                <Flex direction="row" justifyContent="center" w="100%" mt="5">
                  <ButtonDark
                    h={10}
                    w="30%"
                    onPress={() => select("Entertaintment")}
                    bg={
                      data.intrests &&
                      data.intrests.indexOf("Entertaintment") != -1
                        ? "buttonDarkClick"
                        : "buttonDark"
                    }
                  >
                    <Text style={styles.buttonText}>Entertaintment</Text>
                  </ButtonDark>
                  <View w="5%"></View>
                  <ButtonDark
                    h={10}
                    w="30%"
                    onPress={() => select("Lifestyle")}
                    bg={
                      data.intrests && data.intrests.indexOf("Lifestyle") != -1
                        ? "buttonDarkClick"
                        : "buttonDark"
                    }
                  >
                    <Text style={styles.buttonText}>Lifestyle</Text>
                  </ButtonDark>
                </Flex>
                <Flex
                  direction="row"
                  justifyContent="space-around"
                  w="100%"
                  mt="5"
                >
                  <ButtonDark
                    h={10}
                    w="30%"
                    onPress={() => setShowInput(!showInput)}
                  >
                    <Text style={styles.buttonText}>Other</Text>
                  </ButtonDark>
                </Flex>

                {showInput && (
                  <Center w="100%" mt="5">
                    <InputIntrests
                      color="#fff"
                      value={inputData}
                      onChangeText={(text) => setInputData(text)}
                    />
                  </Center>
                )}
              </View>
            </View>
            <Center w="100%">
              {data.brand_type && data.brand_type.length > 0 ? (
                <ButtonDark
                  w="80%"
                  h={10}
                  onPress={() => navigation.navigate("ConnectNetworks")}
                >
                  <Text fontSize="14" color="#fff" fontWeight="800">
                    Next
                  </Text>
                </ButtonDark>
              ) : (
                <ButtonDark w="80%" h={10} bg="buttonDarkClick">
                  <Text fontSize="14" color="#fff" fontWeight="800">
                    Next
                  </Text>
                </ButtonDark>
              )}
            </Center>
          </Box>
        </LoginLayout>
      </BackLayout>
    </LayoutFrame>
  );
};

export default InterestsBrand;
const styles = StyleSheet.create({
  contaienr: {
    paddingTop: "15%",
    paddingLeft: "2%",
    paddingRight: "2%",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  logoContainer: {
    width: "100%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "800",
    textAlign: "center",
    marginTop: 10,
  },
  headerText2: {
    fontSize: 13,
    fontWeight: "300",
    color: "#fff",
    marginTop: 20,
  },
  body: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 11,
    color: "#fff",
    // fontFamily: "Gilroy",
    fontWeight: "800",
  },
});
