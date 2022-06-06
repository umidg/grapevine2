import React, { useState, useContext, useEffect } from "react";
import { LayoutFrame, BackLayout, LoginLayout } from "../../Layout/index";
import { Box, Text, View } from "native-base";
import { RegisterData } from "../../Context/RegisterContext";
import { UserValue } from "../../Context/UserContext";
import { grapevineBackend } from "../../API/ci.axios";
import { ActivityIndicator, Alert } from "react-native";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Logo, ButtonLight, InputUsername } from "../../AtomComponents/index";

const EnterUsername = ({ navigation }) => {
  const [state, setState] = useState("initial");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useContext(RegisterData);
  const [user, setUser] = useContext(UserValue);
  const validateUsername = (username) => {
    setState("loading");
    setData({ ...data, username: username });
    grapevineBackend(
      "/auth/usernameIsValid",
      { username: username },
      "POST",
      "",
      ""
    )
      .then((response) => {
        if (response.data.data.valid) {
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
        { ...data, passwordConfirm: data.password, intrests: data.intrests },
        "POST"
      )
        .then(async ({ data }) => {
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
          console.log(err);
          Alert.alert("", "Something Went Wrong");
        });
    }
  };

  return (
    <LayoutFrame>
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
                <Text fontSize={12} color="#f5f4ff" fontWeight={"800"} italic>
                  Username
                </Text>
                <InputUsername
                  placeholder="Username"
                  value={data.username}
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
    </LayoutFrame>
  );
};

export default EnterUsername;
