import React from "react";
import { Center, Text, View } from "native-base";
import LayoutFrame from "../../Layout/LayoutFrame";
import Logo from "../../AtomComponents/Logo/Logo";
import ButtonDark from "../../AtomComponents/Buttons/ButtonDark";
import ButtonLight from "../../AtomComponents/Buttons/ButtonLight";
const LoginSignup = ({ navigation }) => {
  return (
    <LayoutFrame>
      <Center h="100%" w="100%" bg="loginPageBg">
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
        <ButtonLight
          w="70%"
          onPress={() => navigation.navigate("ContinueWith")}
        >
          Sign Up
        </ButtonLight>
      </Center>
    </LayoutFrame>
  );
};

export default LoginSignup;
