import { Alert, StyleSheet, View } from "react-native";
import React, { useState, useContext } from "react";
import { Text, Center } from "native-base";
import { LayoutFrame, BackLayout, LoginLayout } from "../../../Layout/index";

import { RegisterData } from "../../../Context/RegisterContext";
import { Formik } from "formik";
const { RegisterBrandSchema } = require("../../../FormValidationSchema");

import {
  ButtonDark,
  Input,
  InputPassword,
  Logo,
} from "../../../AtomComponents/index";

const Register_Brand = ({ navigation }) => {
  const [data, setData] = useContext(RegisterData);

  const reg = (info) => {
    setData({
      ...data,
      brand_name: info.brand_name,
      number: info.number,
      password: info.password,
      email: info.email,
      address: info.address,
    });
    navigation.navigate("EnterDob");
  };
  return (
    <LayoutFrame>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation}>
          <Center>
            <View style={{ padding: 5, width: "80%" }}>
              <View style={styles.logoContainer}>
                <Logo />
              </View>
              <Formik
                initialValues={{
                  brand_name: "",
                  number: "",
                  address: "",
                  email: data.email,
                  password: "",
                }}
                onSubmit={reg}
                validationSchema={RegisterBrandSchema}
                validateOnChange={false}
                validateOnBlur={false}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <View>
                    <View style={styles.bodyContainer}>
                      <Text style={styles.EmailPw}>Brand Name</Text>
                      <Input
                        placeholder="Brand Name"
                        onChangeText={handleChange("brand_name")}
                        value={values.brand_name}
                        onBlur={handleBlur("brand_name")}
                        status={errors.brand_name ? "danger" : "normal"}
                      />

                      <Text style={styles.EmailPw}>Email</Text>
                      {data.email ? (
                        <Input value={data.email} editable={false} />
                      ) : (
                        <Input
                          placeholder="Email"
                          onChangeText={handleChange("email")}
                          value={values.email}
                          onBlur={handleBlur("email")}
                          status={errors.email ? "danger" : "normal"}
                        />
                      )}
                      <Text style={styles.EmailPw}>Phone Number</Text>
                      <Input
                        placeholder="Phone Number"
                        onChangeText={handleChange("number")}
                        value={values.number}
                        onBlur={handleBlur("number")}
                        status={errors.number ? "danger" : "normal"}
                      />
                      <Text style={styles.EmailPw}>Location</Text>
                      <Input
                        placeholder="Location"
                        onChangeText={handleChange("address")}
                        value={values.address}
                        onBlur={handleBlur("address")}
                        status={errors.address ? "danger" : "normal"}
                      />
                      {/* <SelectCountry
                    value={values.address}
                    onBlur={handleBlur("address")}
                    status={errors.address ? "danger" : "normal"}
                    onValueChange={handleChange("address")}
                  /> */}
                      <Text style={styles.EmailPw}>Password</Text>
                      <InputPassword
                        placeholder="Password"
                        onChangeText={handleChange("password")}
                        value={values.password}
                        onBlur={handleBlur("password")}
                        status={errors.password ? "danger" : "normal"}
                      />
                    </View>
                    <View>
                      <Text style={styles.agrementText}>
                        By continuing, you agree to our{" "}
                        <Text color="buttonDark"> Terms of Services</Text> and
                        <Text color="buttonDark"> Privacy Policy</Text>
                      </Text>
                    </View>
                    <ButtonDark onPress={handleSubmit}>Next</ButtonDark>
                  </View>
                )}
              </Formik>
            </View>
          </Center>
        </LoginLayout>
      </BackLayout>
    </LayoutFrame>
  );
};

export default Register_Brand;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    height: 100,
    width: 100,
  },

  bodyContainer: {},
  EmailPw: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
  },

  agrementText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
    textAlign: "center",
  },
});
