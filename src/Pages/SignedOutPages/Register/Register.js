import React from "react";
import { Text, Center, View, Box, Button } from "native-base";
// const { RegisterSchema } = require('../../../FormValidationSchema');
import { RegisterSchema } from "../../../FormValidationSchema";
import { Formik, useFormik } from "formik";
import { AtomComponents, Modal, Layout, Hooks } from "../../../Exports/index";

const Register = ({ navigation }) => {
  const { ButtonDark, Input, InputPassword, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  // const reg = (info) => {
  //   setRegisterData({
  //     ...registerData,
  //     fname: info.firstName,
  //     lname: info.lastName,
  //     number: info.number,
  //     password: info.password,
  //     email: info.email,
  //     address: info.address,
  //   });
  //   navigation.navigate('EnterDob');
  // };

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      number: "",
      password: "",
      email: registerData.email,
      address: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      console.log("submitted");
      setRegisterData({ ...registerData, ...values });
      navigation.navigate("EnterDob");
    },
  });

  console.log(formik.errors ? formik.errors : "no error", "error");

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation} next onPress={formik.handleSubmit}>
          <Center>
            <Box w="80%" p={5}>
              <Box alignItems={"center"} mb={5}>
                <Logo />
              </Box>

              <View>
                <View>
                  <Text color={"#fff"} fontSize={12} fontWeight="800">
                    First Name
                  </Text>
                  <Input
                    id="fname"
                    onChangeText={formik.handleChange("fname")}
                    status={formik.errors.fname ? "danger" : "normal"}
                    value={formik.values.fname}
                    onBlur={formik.handleBlur("fname")}
                  />
                  <Text color={"#fff"} fontSize={12} fontWeight="800">
                    Last Name
                  </Text>
                  <Input
                    id="lname"
                    onChangeText={formik.handleChange("lname")}
                    value={formik.values.lname}
                    onBlur={formik.handleBlur("lname")}
                    status={formik.errors.lname ? "danger" : "normal"}
                  />
                  <Text color={"#fff"} fontSize={12} fontWeight="800">
                    Email
                  </Text>
                  {registerData.email ? (
                    <Input value={registerData.email} editable={false} />
                  ) : (
                    <Input
                      id="email"
                      onChangeText={formik.handleChange("email")}
                      value={formik.values.email}
                      onBlur={formik.handleBlur("email")}
                      status={formik.errors.email ? "danger" : "normal"}
                    />
                  )}
                  <Text color={"#fff"} fontSize={12} fontWeight="800">
                    Phone Number
                  </Text>
                  <Input
                    id="number"
                    onChangeText={formik.handleChange("number")}
                    value={formik.values.number}
                    onBlur={formik.handleBlur("number")}
                    status={formik.errors.number ? "danger" : "normal"}
                  />
                  <Text color={"#fff"} fontSize={12} fontWeight="800">
                    Location
                  </Text>
                  <Input
                    id="address"
                    onChangeText={formik.handleChange("address")}
                    value={formik.values.address}
                    onBlur={formik.handleBlur("address")}
                    status={formik.errors.address ? "danger" : "normal"}
                  />
                  <Text color={"#fff"} fontSize={12} fontWeight="800">
                    Password
                  </Text>
                  <InputPassword
                    id="password"
                    onChangeText={formik.handleChange("password")}
                    value={formik.values.password}
                    onBlur={formik.handleBlur("password")}
                    status={formik.errors.password ? "danger" : "normal"}
                  />
                </View>
                <View>
                  <Text
                    color="#fff"
                    fontWeight={"500"}
                    fontSize={12}
                    textAlign="center"
                  >
                    By continuing, you agree to our{" "}
                    <Text color="dark"> Terms of Services</Text> and
                    <Text color="dark"> Privacy Policy</Text>
                  </Text>
                </View>
                {/* <ButtonDark onPress={handleSubmit}>Next</ButtonDark> */}
              </View>
            </Box>
          </Center>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default Register;
