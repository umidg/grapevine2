import React, { useEffect, useState } from "react";
import { LayoutFrame, BackLayout, LoginLayout } from "../../Layout/index";
import { Box, Text, Center, View } from "native-base";
import { Alert } from "react-native";

import { ButtonLight, InputCode, Logo } from "../../AtomComponents/index";

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
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box pt="15%" px={5}>
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
                    Didn’t recieve your code?
                    <Text color="buttonDark">Resend</Text>
                  </Text>
                </View>
              </View>
            </View>
          </Box>
        </LoginLayout>
      </BackLayout>
    </LayoutFrame>
  );
};

export default EnterCode;
