import React, { useEffect, useState } from "react";
import LayoutFrame from "../../Layout/LayoutFrame";
import { Box, Text, Center, View } from "native-base";
import Logo from "../../AtomComponents/Logo/Logo";
import ButtonLight from "../../AtomComponents/Buttons/ButtonLight";
import ShowLogInText from "../../MoleculeComponents/ShowLogInText";
import InputCode from "../../AtomComponents/Input/InputCode";
import BackIcon from "../../AtomComponents/BackIcon/BackIcon";
import { Alert } from "react-native";
const EnterCode = ({ navigation, route }) => {
  const [inputCode, setInputCode] = useState("");
  const { code } = route.params;
  const compareCode = () => {
    console.log(code, "  ", inputCode);
    if (code == inputCode) {
      navigation.navigate("AccountType");
    } else {
      Alert.alert("Alert", "code incorrect");
    }
  };
  return (
    <LayoutFrame>
      <Box
        h="100%"
        w="100%"
        bg="loginPageBg"
        pt="15%"
        px={5}
        justifyContent={"space-between"}
      >
        <BackIcon onPress={() => navigation.pop()} />
        <View>
          <View w="100%" alignItems={"center"}>
            <Logo />
            <Text
              fontSize={17}
              color="#fff"
              fontWeight={"800"}
              textAlign="center"
              mt="2"
              italic
            >
              Enter Code
            </Text>
          </View>
          <View mt="15">
            <Center w="100%">
              <InputCode
                w="70%"
                value={inputCode}
                onChangeText={(text) => setInputCode(text)}
              />
            </Center>
            <View mt="2">
              <ButtonLight onPress={compareCode}>
                <Text fontSize={14} color="#fff" fontWeight={"800"}>
                  Verify
                </Text>
              </ButtonLight>
              <Text
                fontSize={13}
                textAlign="center"
                color="#fff"
                fontWeight={"800"}
                mt="2"
                italic
              >
                Didn’t recieve your code?<Text color="buttonDark">Resend</Text>
              </Text>
            </View>
          </View>
        </View>
        <ShowLogInText onPress={() => navigation.navigate("Login")} />
      </Box>
    </LayoutFrame>
  );
};

export default EnterCode;
