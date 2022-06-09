import React from "react";
import { Text, Center, View, Box } from "native-base";
import { Formik } from "formik";
const { RegisterAgencySchema } = require("../../../FormValidationSchema");
import { AtomComponents, Modal, Layout, Hooks } from "../../../Exports/index";

const Register_Agency = ({ navigation }) => {
  const { ButtonDark, Input, InputPassword, Logo } = AtomComponents;
  const { LayoutFrame, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const reg = (info) => {
    setRegisterData({
      ...registerData,
      agency_name: info.agency_name,
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
            <Box p={5} w="80%">
              <Box mb={5} alignItems="center">
                <Logo />
              </Box>
              <Formik
                initialValues={{
                  agency_name: "",
                  number: "",
                  address: "",
                  email: registerData.email,
                  password: "",
                }}
                onSubmit={reg}
                validationSchema={RegisterAgencySchema}
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
                        Agency Name
                      </Text>
                      <Input
                        placeholder="Agency Name"
                        onChangeText={handleChange("agency_name")}
                        value={values.agency_name}
                        onBlur={handleBlur("agency_name")}
                        status={errors.agency_name ? "danger" : "normal"}
                      />

                      <Text color={"#fff"} fontSize={12} fontWeight="800">
                        Email
                      </Text>
                      {registerData.email ? (
                        <Input value={registerData.email} editable={false} />
                      ) : (
                        <Input
                          placeholder="Email"
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
                        placeholder="Phone Number"
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
                        placeholder="Password"
                        onChangeText={handleChange("password")}
                        value={values.password}
                        onBlur={handleBlur("password")}
                        status={errors.password ? "danger" : "normal"}
                      />
                    </View>
                    <View>
                      <Text
                        color={"#fff"}
                        fontSize={12}
                        fontWeight="800"
                        textAlign={"center"}
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

export default Register_Agency;
