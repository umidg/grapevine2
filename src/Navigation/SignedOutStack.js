/* eslint-disable jsx-quotes */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { signedOutRoutes } from './Routes';
import RegisterContext from '../Context/RegisterContext';

const Stack = createNativeStackNavigator();

const SignedOutStack = () => (
  <RegisterContext>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='LoginSignup'
        screenOptions={{
          headerShown: false,
        }}
      >
        {signedOutRoutes.map((route) => (
          <Stack.Screen
            key={route.routeName}
            name={route.routeName}
            component={route.component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  </RegisterContext>
);

export default SignedOutStack;
