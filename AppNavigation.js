import { View, ActivityIndicator } from "react-native";

import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./navigations/AuthNavigator";
import BottomTabNavigator from "./navigations/BottomTabNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";

import { useAuthContext } from "./hooks/useAuthContext";

export default function AppNavigation() {
  const { authIsReady, user } = useAuthContext();

  if (!authIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
      {/* <BottomTabNavigator /> */}
    </NavigationContainer>
  );
}
