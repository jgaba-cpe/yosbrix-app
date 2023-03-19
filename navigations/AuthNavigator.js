import React from "react";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Login from "../screens/Login";
import Register from "../screens/Register";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
