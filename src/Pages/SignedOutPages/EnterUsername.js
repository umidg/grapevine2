import React, { useState, useContext, useEffect } from "react";
import { Box, Text, View } from "native-base";
import { grapevineBackend } from "../../API/ci.axios";
import { ActivityIndicator, Alert } from "react-native";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AtomComponents, Layout, Hooks } from "../../Exports/index";
const EnterUsername = ({ navigation }) => {
  const { Logo, ButtonLight, InputUsername } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData, user, setUser } = Hooks.ContextHook();
  const [state, setState] = useState("initial");
  const [loading, setLoading] = useState(false);
  const validateUsername = (username) => {
    setState("loading");
    setRegisterData({ ...registerData, username: username });
    grapevineBackend(
      "/auth/usernameIsValid",
      { username: username },
      "POST",
      "",
      ""
    )
      .then((response) => {
        console.log(response.data);
        if (response.data?.data?.valid) {
          setState("valid");
        } else {
          setState("invalid");
        }
      })
      .catch((err) => console.log(err));
  };

  const reg = () => {
    if (!loading && state == "valid") {
      setLoading(true);
      grapevineBackend(
        "/auth/register",
        {
          ...registerData,
          passwordConfirm: registerData.password,
          intrests: registerData.intrests,
        },
        "POST"
      )
        .then(async ({ data }) => {
          console.log(data);
          if (data.code == 200) {
            Toast.show("Registered Succssfully", {
              duration: Toast.durations.LONG,
            });
            await AsyncStorage.setItem("user", JSON.stringify(data.data));
            setUser({
              ...data.data,
              ...user,
            });
          } else {
            setLoading(false);
            Toast.show(data.message, {
              duration: Toast.durations.LONG,
            });
          }
        })
        .catch((err) => {
          console.log(err, "error while sending data");
          Alert.alert("", "Something Went Wrong");
        });
    }
  };

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Box pt="15%" px="2%" pb="30">
            <View>
              <View w="100%" alignItems="center">
                <Logo />
                <Text
                  fontSize="17"
                  color="#fff"
                  fontWeight="800"
                  textAlign="center"
                  mt="5"
                >
                  Select your username
                </Text>
              </View>
              <View mt={15}>
                <Text fontSize={12} color="#f5f4ff" fontWeight={"800"}>
                  Username
                </Text>
                <InputUsername
                  placeholder="Username"
                  value={registerData.username}
                  onChangeText={(text) => validateUsername(text)}
                  state={state}
                />
                {state == "valid" && (
                  <Text
                    fontSize={12}
                    color="#f5f4ff"
                    fontWeight={"800"}
                    textAlign="center"
                    italic
                  >
                    This username is available!
                  </Text>
                )}

                <View style={{ margin: 30 }}>
                  <ButtonLight onPress={reg}>
                    {loading ? (
                      <ActivityIndicator size="small" color="#0000ff" />
                    ) : (
                      <Text fontSize={14} color="#fff" fontWeight={"800"}>
                        Confirm
                      </Text>
                    )}
                  </ButtonLight>
                </View>
              </View>
            </View>
          </Box>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default EnterUsername;
