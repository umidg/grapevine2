import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserValue } from "../../Context/UserContext";
import { Center, Text, Box, View } from "native-base";
import LayoutFrame from "../../Layout/LayoutFrame";
import Logo from "../../AtomComponents/Logo/Logo";
import ButtonDark from "../../AtomComponents/Buttons/ButtonDark";
import Input from "../../AtomComponents/Input/Input";
import { grapevineBackend } from "../../API/index";
import { userHook } from "../../Hooks";
import { Formik } from "formik";
import Toast from "react-native-root-toast";
import { ActivityIndicator } from "react-native";
import InputPassword from "../../AtomComponents/Input/inputPassword";

const { SignupSchema } = require("../../FormValidationSchema");
const Login = ({ navigation }) => {
  const [user, setUser] = useContext(UserValue);
  const [loading, setLoading] = useState(false);
  const logIn = (data) => {
    setLoading(true);
    grapevineBackend(
      "/auth/login",
      { email: data.email.toLowerCase(), password: data.password },
      "POST"
    )
      .then(async ({ data }) => {
        console.log(data);
        try {
          if (data.status) {
            await AsyncStorage.setItem("user", JSON.stringify(data.data));
            setUser({
              ...data.data,
              ...user,
            });
          } else {
            setLoading(false);
            if (typeof data.message == "string") {
              Toast.show(data.message, {
                duration: Toast.durations.LONG,
              });
            } else {
              throw Error("Something Went Wrong");
            }
          }
        } catch (err) {
          Toast.show(err.message, {
            duration: Toast.durations.LONG,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        Toast.show(err.message, {
          duration: Toast.durations.LONG,
        });
        setLoading(false);
      });
  };
  return (
    <LayoutFrame>
      {/* <LoadingMessageModal
        showModal={showModal}
        setShowModal={setShowModal}
        title="Login"
        message={modalMessage}
        setMessage={setModalMessage}
      /> */}

      <Center h="100%" w="100%" bg="loginPageBg">
        <View p="5" w="70%">
          <View alignItems="center" mb="5">
            {/* <Logo /> */}
            <Center
              h={150}
              w={150}
              bg="rgba(0,0,0,0.25882352941176473)"
              borderRadius={"md"}
            >
              <Text
                color={"#fff"}
                fontSize="16"
                fontWeight="800"
                position={"absolute"}
                bottom={1}
              >
                Face ID
              </Text>
            </Center>
          </View>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={logIn}
            validationSchema={SignupSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                <Text style={styles.EmailPw}>
                  Username, Email or Phone Number
                </Text>
                <Input
                  value={values.email}
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  status={errors.email ? "danger" : "normal"}
                />
                <Text style={styles.EmailPw}>Password</Text>

                <InputPassword
                  value={values.password}
                  onChangeText={handleChange("password")}
                  status={errors.password ? "danger" : "normal"}
                  onBlur={handleBlur("password")}
                />

                <View>
                  <Text
                    textAlign="right"
                    color="#fff"
                    fontWeight={"800"}
                    fontSize={12}
                  >
                    Forgot Password?
                  </Text>
                </View>
                <View mt="10">
                  {loading ? (
                    <ButtonDark>
                      <ActivityIndicator size="small" color="#fff" />
                    </ButtonDark>
                  ) : (
                    <ButtonDark onPress={handleSubmit}>Login</ButtonDark>
                  )}

                  <TouchableOpacity
                    onPress={() => navigation.navigate("ContinueWith")}
                  >
                    <Text
                      fontSize={13}
                      fontWeight="800"
                      color="#fff"
                      textAlign={"center"}
                      mt="5"
                      italic
                    >
                      Don't have an account?{" "}
                      <Text color="buttonDark">Sign Up</Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </Center>
    </LayoutFrame>
  );
};

export default Login;
const styles = StyleSheet.create({
  EmailPw: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    fontStyle: "italic",
  },
});
