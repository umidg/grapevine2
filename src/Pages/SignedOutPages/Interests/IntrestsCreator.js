import React, { useState, useContext } from "react";
import { StyleSheet } from "react-native";
import { View, Text, Flex, Spacer, Center } from "native-base";
import LayoutFrame from "../../../Layout/LayoutFrame";
import { Box } from "native-base";
import Logo from "../../../AtomComponents/Logo/Logo";
import ShowLogInText from "../../../MoleculeComponents/ShowLogInText";
import ButtonDark from "../../../AtomComponents/Buttons/ButtonDark";
import InputIntrests from "../../../AtomComponents/Input/InputIntrests";
import BackIcon from "../../../AtomComponents/BackIcon/BackIcon";
import { RegisterData } from "../../../Context/RegisterContext";

const IntrestsCreator = ({ navigation }) => {
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
      <Box h="100%" w="100%" bg="loginPageBg" style={styles.contaienr}>
        <BackIcon onPress={() => navigation.pop()} />

        <View>
          <View style={styles.logoContainer}>
            <Logo />
            <Text style={styles.headerText}>
              Which categories are you interested in?
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
                  data.intrests && data.intrests.indexOf("Entertaintment") != -1
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
            <Flex direction="row" justifyContent="space-around" w="100%" mt="5">
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
          {data.intrests && data.intrests.length > 0 ? (
            <ButtonDark
              w="80%"
              onPress={() => navigation.navigate("ConnectNetworks")}
            >
              <Text fontSize="14" color="#fff" fontWeight="800">
                Next
              </Text>
            </ButtonDark>
          ) : (
            <ButtonDark w="80%" bg="buttonDarkClick">
              <Text fontSize="14" color="#fff" fontWeight="800">
                Next
              </Text>
            </ButtonDark>
          )}
          <View style={[{ marginTop: 20 }]}>
            <ShowLogInText onPress={() => navigation.navigate("Login")} />
          </View>
        </Center>
      </Box>
    </LayoutFrame>
  );
};

export default IntrestsCreator;

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
