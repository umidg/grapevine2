import React, { useState } from "react";
import { Box, Text, Center, View, Select, CheckIcon } from "native-base";
import { AtomComponents, Layout, Hooks } from "../../Exports/index";
const AccountType = ({ navigation }) => {
  console.log(Hooks, "hooks");
  const { ButtonDark, Logo } = AtomComponents;
  const { LayoutFrame, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const [showDropDown, setShowDropDown] = useState(false);
  const type = ["Brand", "Agency"];
  const SetAccountType = (type) => {
    if (type == registerData.account_type) {
      setRegisterData({ ...registerData, account_type: null });
    } else {
      setRegisterData({ ...registerData, account_type: type });
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
                  Account Type
                </Text>
              </View>
              <Center mt="15">
                <ButtonDark
                  w="70%"
                  h={10}
                  onPress={() => SetAccountType("User")}
                  bg={registerData.account_type == "User" ? "dark" : "light"}
                >
                  <Text fontSize={14} color="#fff" fontWeight={"800"}>
                    User Account
                  </Text>
                </ButtonDark>
                <ButtonDark
                  w="70%"
                  h={10}
                  onPress={() => setShowDropDown(!showDropDown)}
                >
                  <Text fontSize={14} color="#fff" fontWeight={"800"}>
                    Business Account
                  </Text>
                </ButtonDark>
                {showDropDown && (
                  <Center>
                    <Select
                      bg="rgba(61,54,130,0.6705882352941176)"
                      borderRadius={"md"}
                      height="10"
                      width="70%"
                      selectedValue={
                        registerData.account_type
                          ? registerData.account_type
                          : " "
                      }
                      minWidth="200"
                      color={"#fff"}
                      fontWeight="800"
                      accessibilityLabel="Choose "
                      placeholder="Choose "
                      _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />,
                      }}
                      borderWidth="0"
                      mt={1}
                      onValueChange={(itemValue) => SetAccountType(itemValue)}
                    >
                      {type.map((t) => (
                        <Select.Item label={t} value={t} key={t} />
                      ))}
                    </Select>
                  </Center>
                )}
              </Center>
            </View>
            <Center>
              {registerData.account_type ? (
                <ButtonDark
                  w="80%"
                  bg="dark"
                  onPress={() => {
                    if (registerData.account_type == "User")
                      navigation.navigate("Register");
                    else if (registerData.account_type == "Brand") {
                      navigation.navigate("Register_Brand");
                    } else navigation.navigate("Register_Agency");
                  }}
                >
                  <Text fontSize={14} color="#fff" fontWeight={"800"}>
                    Next
                  </Text>
                </ButtonDark>
              ) : (
                <ButtonDark w="80%" bg="light">
                  <Text fontSize={14} color="#fff" fontWeight={"800"}>
                    Next
                  </Text>
                </ButtonDark>
              )}
            </Center>
          </Box>
        </LoginLayout>
      </BackLayout>
    </LayoutFrame>
  );
};

export default AccountType;
