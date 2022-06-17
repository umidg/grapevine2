import React from 'react';
import { Text, Center, View, Box } from 'native-base';
import { Formik, useFormik } from 'formik';
const { RegisterAgencySchema } = require('../../../FormValidationSchema');
import { AtomComponents, Modal, Layout, Hooks } from '../../../Exports/index';

const Register_Agency = ({ navigation }) => {
  const { ButtonDark, Input, InputPassword, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  // const reg = (info) => {
  //   setRegisterData({
  //     ...registerData,
  //     agency_name: info.agency_name,
  //     number: info.number,
  //     password: info.password,
  //     email: info.email,
  //     address: info.address,
  //   });
  //   navigation.navigate('EnterDob');
  // };

  const formik = useFormik({
    initialValues: {
      agency_name: '',
      number: '',
      address: '',
      email: registerData.email,
      password: '',
    },
    validationSchema: RegisterAgencySchema,
    onSubmit: (values) => {
      console.log('submitted');
      setRegisterData({ ...registerData, ...values });
      navigation.navigate('EnterDob');
    },
  });

  return (
    <SignoutLayout>
      <BackLayout navigation={navigation}>
        <LoginLayout navigation={navigation} next onPress={formik.handleSubmit}>
          <Center>
            <Box p={5} w='80%'>
              <Box mb={5} alignItems='center'>
                <Logo />
              </Box>
              {/* <Formik
                initialValues={{
                  agency_name: '',
                  number: '',
                  address: '',
                  email: registerData.email,
                  password: '',
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
                }) => ( */}
              <View>
                <View>
                  <Text color={'#fff'} fontSize={12} fontWeight='800'>
                    Agency Name
                  </Text>
                  <Input
                    onChangeText={formik.handleChange('agency_name')}
                    value={formik.values.agency_name}
                    onBlur={formik.handleBlur('agency_name')}
                    status={formik.errors.agency_name ? 'danger' : 'normal'}
                  />

                  <Text color={'#fff'} fontSize={12} fontWeight='800'>
                    Email
                  </Text>
                  {registerData.email ? (
                    <Input value={registerData.email} editable={false} />
                  ) : (
                    <Input
                      onChangeText={formik.handleChange('email')}
                      value={formik.values.email}
                      onBlur={formik.handleBlur('email')}
                      status={formik.errors.email ? 'danger' : 'normal'}
                    />
                  )}
                  <Text color={'#fff'} fontSize={12} fontWeight='800'>
                    Phone Number
                  </Text>
                  <Input
                    onChangeText={formik.handleChange('number')}
                    value={formik.values.number}
                    onBlur={formik.handleBlur('number')}
                    status={formik.errors.number ? 'danger' : 'normal'}
                  />
                  <Text color={'#fff'} fontSize={12} fontWeight='800'>
                    Location
                  </Text>
                  <Input
                    onChangeText={formik.handleChange('address')}
                    value={formik.values.address}
                    onBlur={formik.handleBlur('address')}
                    status={formik.errors.address ? 'danger' : 'normal'}
                  />
                  {/* <SelectCountry
                    value={values.address}
                    onBlur={handleBlur("address")}
                    status={errors.address ? "danger" : "normal"}
                    onValueChange={handleChange("address")}
                  /> */}
                  <Text color={'#fff'} fontSize={12} fontWeight='800'>
                    Password
                  </Text>
                  <InputPassword
                    onChangeText={formik.handleChange('password')}
                    value={formik.values.password}
                    onBlur={formik.handleBlur('password')}
                    status={formik.errors.password ? 'danger' : 'normal'}
                  />
                </View>
                <View>
                  <Text
                    color={'#fff'}
                    fontSize={12}
                    fontWeight='800'
                    textAlign={'center'}
                  >
                    By continuing, you agree to our{' '}
                    <Text color='buttonDark'> Terms of Services</Text> and
                    <Text color='buttonDark'> Privacy Policy</Text>
                  </Text>
                </View>
                {/* <ButtonDark onPress={handleSubmit}>Next</ButtonDark> */}
              </View>
              {/* )}
              </Formik> */}
            </Box>
          </Center>
        </LoginLayout>
      </BackLayout>
    </SignoutLayout>
  );
};

export default Register_Agency;
