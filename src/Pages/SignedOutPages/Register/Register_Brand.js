import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, Center, View, Box } from 'native-base';
import { useFormik } from 'formik';
const { RegisterBrandSchema } = require('../../../FormValidationSchema');
import { AtomComponents, Layout, Hooks } from '../../../Exports/index';

const Register_Brand = ({ navigation }) => {
  const { ButtonDark, Input, InputPassword, Logo } = AtomComponents;
  const { SignoutLayout, BackLayout, LoginLayout } = Layout;
  const { registerData, setRegisterData } = Hooks.ContextHook();

  const reg = (info) => {
    setRegisterData({
      ...registerData,
      brand_name: info.brand_name,
      number: info.number,
      password: info.password,
      email: info.email,
      address: info.address,
    });
    navigation.navigate('EnterDob');
  };

  const formik = useFormik({
    initialValues: {
      brand_name: '',
      number: '',
      address: '',
      email: registerData.email,
      password: '',
    },
    validationSchema: RegisterBrandSchema,
    onSubmit: (values) => {
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
              <Box my={5} alignItems='center'>
                <Logo />
              </Box>
              {/* <Formik
                initialValues={{
                  brand_name: '',
                  number: '',
                  address: '',
                  email: registerData.email,
                  password: '',
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
                }) => ( */}
              <View>
                <View>
                  <Text color={'#fff'} fontSize={12} fontWeight='800'>
                    Brand Name
                  </Text>
                  <Input
                    onChangeText={formik.handleChange('brand_name')}
                    value={formik.values.brand_name}
                    onBlur={formik.handleBlur('brand_name')}
                    status={formik.errors.brand_name ? 'danger' : 'normal'}
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
                    color='#fff'
                    fontWeight={'500'}
                    fontSize={12}
                    textAlign='center'
                  >
                    By continuing, you agree to our{' '}
                    <Text color='dark'> Terms of Services</Text> and
                    <Text color='dark'> Privacy Policy</Text>
                  </Text>
                </View>
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

export default Register_Brand;
