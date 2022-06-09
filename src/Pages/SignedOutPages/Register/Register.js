import React from "react";
import { Text, Center, View, Box } from "native-base";
const { RegisterSchema } = require("../../../FormValidationSchema");
import { Formik } from "formik";
import { AtomComponents, Modal, Layout, Hooks } from "../../../Exports/index";

const Register = ({ navigation }) => {
  const { ButtonDark, Input, InputPassword, Logo } = AtomComponents;
  const { LayoutFrame, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const reg = (info) => {
    setRegisterData({
      ...registerData,
      fname: info.firstName,
      lname: info.lastName,
      number: info.number,
      password: info.password,
      email: info.email,
      address: info.address,
    });
    navigation.navigate("EnterDob");
  };
  return (
    <LayoutFrame>
      <LoginLayout navigation={navigation}>
        <BackLayout navigation={navigation}>
          <Center>
            <Box w="80%" p={5}>
              <Box alignItems={"center"} mb={5}>
                <Logo />
              </Box>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  number: "",
                  address: "",
                  email: registerData.email,
                  password: "",
                }}
                onSubmit={reg}
                validationSchema={RegisterSchema}
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
                    <View>
                      <Text color={"#fff"} fontSize={12} fontWeight="800">
                        First Name
                      </Text>
                      <Input
                        onChangeText={handleChange("firstName")}
                        status={errors.firstName ? "danger" : "normal"}
                        value={values.firstName}
                        onBlur={handleBlur("firstName")}
                      />
                      <Text color={"#fff"} fontSize={12} fontWeight="800">
                        Last Name
                      </Text>
                      <Input
                        onChangeText={handleChange("lastName")}
                        value={values.lastName}
                        onBlur={handleBlur("lastName")}
                        status={errors.lastName ? "danger" : "normal"}
                      />
                      <Text color={"#fff"} fontSize={12} fontWeight="800">
                        Email
                      </Text>
                      {registerData.email ? (
                        <Input value={registerData.email} editable={false} />
                      ) : (
                        <Input
                          onChangeText={handleChange("email")}
                          value={values.email}
                          onBlur={handleBlur("email")}
                          status={errors.email ? "danger" : "normal"}
                        />
                      )}
                      <Text color={"#fff"} fontSize={12} fontWeight="800">
                        Phone Number
                      </Text>
                      <Input
                        onChangeText={handleChange("number")}
                        value={values.number}
                        onBlur={handleBlur("number")}
                        status={errors.number ? "danger" : "normal"}
                      />
                      <Text color={"#fff"} fontSize={12} fontWeight="800">
                        Location
                      </Text>
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
                      <Text color={"#fff"} fontSize={12} fontWeight="800">
                        Password
                      </Text>
                      <InputPassword
                        onChangeText={handleChange("password")}
                        value={values.password}
                        onBlur={handleBlur("password")}
                        status={errors.password ? "danger" : "normal"}
                      />
                    </View>
                    <View>
                      <Text
                        color="#fff"
                        fontWeight={"800"}
                        fontSize={12}
                        textAlign="center"
                      >
                        By continuing, you agree to our{" "}
                        <Text color="buttonDark"> Terms of Services</Text> and
                        <Text color="buttonDark"> Privacy Policy</Text>
                      </Text>
                    </View>
                    <ButtonDark onPress={handleSubmit}>Next</ButtonDark>
                  </View>
                )}
              </Formik>
            </Box>
          </Center>
        </BackLayout>
      </LoginLayout>
    </LayoutFrame>
  );
};

export default Register;
