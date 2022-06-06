import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import { Text, Center } from 'native-base';
import { Formik } from 'formik';
import LayoutFrame from '../../../Layout/LayoutFrame';
import Logo from '../../../AtomComponents/Logo/Logo';
import ButtonDark from '../../../AtomComponents/Buttons/ButtonDark';
import Input from '../../../AtomComponents/Input/Input';
import ShowLogInText from '../../../MoleculeComponents/ShowLogInText';
import BackIcon from '../../../AtomComponents/BackIcon/BackIcon';
import { RegisterData } from '../../../Context/RegisterContext';

const { RegisterSchema } = require('../../../FormValidationSchema');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    height: 100,
    width: 100,
  },

  bodyContainer: {},
  EmailPw: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },

  agrementText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 12,
    textAlign: 'center',
  },
});

const Register = ({ navigation }) => {
  const [data, setData] = useContext(RegisterData);

  const reg = (info) => {
    setData({
      ...data,
      fname: info.firstName,
      lname: info.lastName,
      number: info.number,
      password: info.password,
      email: info.email,
      address: info.address,
    });
    navigation.navigate('EnterDob');
  };
  return (
    <LayoutFrame>
      <Center h='100%' w='100%'>
        <BackIcon onPress={() => navigation.pop()} />

        <View style={{ padding: 5, width: '80%' }}>
          <View style={styles.logoContainer}>
            <Logo />
          </View>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              number: '',
              address: '',
              email: data.email,
              password: '',
            }}
            onSubmit={reg}
            validationSchema={RegisterSchema}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
              <View>
                <View style={styles.bodyContainer}>
                  <Text style={styles.EmailPw}>First Name</Text>

                  <Input
                    onChangeText={handleChange('firstName')}
                    status={errors.firstName ? 'danger' : 'normal'}
                    value={values.firstName}
                    onBlur={handleBlur('firstName')}
                  />
                  <Text style={styles.EmailPw}>Last Name</Text>
                  <Input
                    onChangeText={handleChange('lastName')}
                    value={values.lastName}
                    onBlur={handleBlur('lastName')}
                    status={errors.lastName ? 'danger' : 'normal'}
                  />
                  <Text style={styles.EmailPw}>Email</Text>
                  {data.email ? (
                    <Input value={data.email} editable={false} />
                  ) : (
                    <Input
                      onChangeText={handleChange('email')}
                      value={values.email}
                      onBlur={handleBlur('email')}
                      status={errors.email ? 'danger' : 'normal'}
                    />
                  )}
                  <Text style={styles.EmailPw}>Phone Number</Text>
                  <Input
                    onChangeText={handleChange('number')}
                    value={values.number}
                    onBlur={handleBlur('number')}
                    status={errors.number ? 'danger' : 'normal'}
                  />
                  <Text style={styles.EmailPw}>Location</Text>
                  <Input
                    placeholder='Location'
                    onChangeText={handleChange('address')}
                    value={values.address}
                    onBlur={handleBlur('address')}
                    status={errors.address ? 'danger' : 'normal'}
                  />
                  {/* <SelectCountry
                    value={values.address}
                    onBlur={handleBlur("address")}
                    status={errors.address ? "danger" : "normal"}
                    onValueChange={handleChange("address")}
                  /> */}
                  <Text style={styles.EmailPw}>Password</Text>
                  <Input
                    onChangeText={handleChange('password')}
                    value={values.password}
                    onBlur={handleBlur('password')}
                    status={errors.password ? 'danger' : 'normal'}
                  />
                </View>
                <View>
                  <Text fontSize='xs' color='white' textAlign='center'>
                    By continuing, you agree to our
                    <Text color='buttonDark'> Terms of Services&nbsp;</Text>
                    and
                    <Text color='buttonDark'> Privacy Policy</Text>
                  </Text>
                </View>
                <ButtonDark onPress={handleSubmit}>Next</ButtonDark>
              </View>
            )}
          </Formik>
          <View
            style={[
              styles.forgotPwContainer,
              { marginTop: 20, marginBottom: 20 },
            ]}
          >
            <ShowLogInText onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </Center>
    </LayoutFrame>
  );
};

export default Register;
