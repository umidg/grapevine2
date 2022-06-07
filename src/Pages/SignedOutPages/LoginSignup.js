import React from "react";
import { Text, View } from "native-base";
import { AtomComponents, Layout } from "../../Exports/index";

const LoginSignup = ({ navigation }) => {
  const { Logo, ButtonDark, ButtonLight } = AtomComponents;
  const { LayoutFrame } = Layout;
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
