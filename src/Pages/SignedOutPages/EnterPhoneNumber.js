import React, { useContext, useState } from "react";
import { Text, View } from "native-base";
import { LayoutFrame, BackLayout, LoginLayout } from "../../Layout/index";
import { Box } from "native-base";

import { RegisterData } from "../../Context/RegisterContext";

import { ButtonLight, InputNumber, Logo } from "../../AtomComponents/index";

const EnterPhoneNumber = ({ navigation }) => {
  const [number, setNumber] = useState("");
  const [data, setData] = useContext(RegisterData);

  const SendCode = () => {
    if (number.length > 0) {
      setData({ ...data, number: number });
      navigation.navigate("EnterCode", {
        code: "11111",
      });
    }
  };
  return (
    <LayoutFrame>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box pt="15%" px={5} pb="20">
            <View>
              <View w="100%" alignItems={"center"}>
                <Logo />
                <Text
                  fontSize={17}
                  color="#fff"
                  fontWeight={"800"}
                  textAlign="center"
                  mt="5"
                  italic
                >
                  We’ll send you a verification code
                </Text>
              </View>
              <View mt="19">
                <Text fontSize={12} color="#f5f4ff" fontWeight={"800"}>
                  Your phone number{" "}
                </Text>
                <InputNumber
                  value={number}
                  onChangeText={(text) => setNumber(text)}
                />
                <View style={{ margin: 10 }}>
                  <ButtonLight onPress={SendCode}>
                    <Text fontSize={14} color="#fff" fontWeight={"800"}>
                      Send Code
                    </Text>
                  </ButtonLight>
                </View>
              </View>
            </View>
          </Box>
        </LoginLayout>
      </BackLayout>
    </LayoutFrame>
  );
};

export default EnterPhoneNumber;
