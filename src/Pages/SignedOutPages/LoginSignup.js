import React from "react";
import { Text, View } from "native-base";
import { LayoutFrame } from "../../Layout/index";
import { Logo, ButtonDark, ButtonLight } from "../../AtomComponents/index";

const LoginSignup = ({ navigation }) => {
  return (
    <LayoutFrame>
      <View alignItems={"center"}>
        <Logo />
        <Text
          fontSize={"16px"}
          fontWeight="300"
          textAlign={"center"}
          color="#fff"
          mt={5}
          mb={5}
          italic
        >
          Create, Collaborate, Connect
        </Text>
      </View>
      <ButtonDark w="70%" onPress={() => navigation.navigate("Login")}>
        Login
      </ButtonDark>
      <ButtonLight w="70%" onPress={() => navigation.navigate("ContinueWith")}>
        Sign Up
      </ButtonLight>
    </LayoutFrame>
  );
};

export default LoginSignup;
