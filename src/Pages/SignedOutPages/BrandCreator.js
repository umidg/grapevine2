import React, { useContext } from "react";
import { Box, Text, View } from "native-base";
import { AtomComponents, Layout, Hooks } from "../../Exports/index";
const BrandCreator = ({ navigation }) => {
  const { ButtonDark, Logo } = AtomComponents;
  const { LayoutFrame, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const validate = (collaborate) => {
    setRegisterData({ ...registerData, collaborate: collaborate });
    if (registerData.account_type == "User") {
      navigation.navigate("InterestsCreator");
    } else if (registerData.account_type == "Brand") {
      navigation.navigate("InterestsBrand");
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
                  fontSize="17"
                  color="#fff"
                  fontWeight="800"
                  textAlign="center"
                  mt="2"
                  italic
                >
                  Would you like to collaborate with brands?
                </Text>
                <Text
                  fontSize="13"
                  color="#fff"
                  fontWeight="300"
                  textAlign="center"
                  mt="5"
                >
                  This includes gifting!
                </Text>
              </View>
              <View alignItems={"center"} mt="19">
                <ButtonDark w="70%" h={10} onPress={() => validate(true)}>
                  <Text fontSize="17" color="#fff" fontWeight="800">
                    Yes
                  </Text>
                </ButtonDark>
                <ButtonDark w="70%" h={10} onPress={() => validate(false)}>
                  <Text fontSize="17" color="#fff" fontWeight="800">
                    No
                  </Text>
                </ButtonDark>
              </View>
            </View>
          </Box>
        </BackLayout>
      </LoginLayout>
    </LayoutFrame>
  );
};

export default BrandCreator;
