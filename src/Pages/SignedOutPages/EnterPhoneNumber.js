import React, { useContext, useState } from "react";
import { Text, View } from "native-base";
import LayoutFrame from "../../Layout/LayoutFrame";
import { Box } from "native-base";
import Logo from "../../AtomComponents/Logo/Logo";
import InputNumber from "../../AtomComponents/Input/InputNumber";
import ButtonLight from "../../AtomComponents/Buttons/ButtonLight";
import ShowLogInText from "../../MoleculeComponents/ShowLogInText";
import BackIcon from "../../AtomComponents/BackIcon/BackIcon";
import { RegisterData } from "../../Context/RegisterContext";

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
      <Box
        h="100%"
        w="100%"
        bg="loginPageBg"
        pt="15%"
        px={5}
        justifyContent={"space-between"}
        pb="20"
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
        <ShowLogInText onPress={() => navigation.navigate("Login")} />
      </Box>
    </LayoutFrame>
  );
};

export default EnterPhoneNumber;
