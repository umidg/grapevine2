import React from "react";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBar from "./TabBar";
import { signedInRoutes, TabRoutes } from "./Routes";
import { TabNavigation } from "./TabNavigation";

const Stack = createNativeStackNavigator();

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      {/* <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
        tabBar={(props) => {
          return <TabBar {...props} />;
        }}
      >
        {signedInRoutes.map((route) => {
          return (
            <Tab.Screen
              key={route.routeName}
              name={route.routeName}
              component={route.component}
              options={{
                unmountOnBlur: route.routeName == "Chatroom" ? true : false,
              }}
            />
          );
        })}
      </Tab.Navigator> */}
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen key="Tab" name="Tab" component={TabNavigation} />
        {signedInRoutes.map((route) => {
          return (
            <Stack.Screen
              key={route.routeName}
              name={route.routeName}
              component={route.component}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default SignedInStack;
