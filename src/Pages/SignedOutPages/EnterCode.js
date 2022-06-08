import React, { useEffect, useState } from "react";
import { Box, Text, Center, View } from "native-base";
import { Alert } from "react-native";
import { AtomComponents, Layout } from "../../Exports/index";

const EnterCode = ({ navigation, route }) => {
  const { ButtonLight, InputCode, Logo } = AtomComponents;
  const { LayoutFrame, BackLayout, LoginLayout } = Layout;
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
      <LoginLayout navigation={navigation}>
        <BackLayout navigation={navigation}>
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
                    <Text color="dark">Resend</Text>
                  </Text>
                </View>
              </View>
            </View>
          </Box>
        </BackLayout>
      </LoginLayout>
    </LayoutFrame>
  );
};

export default EnterCode;
