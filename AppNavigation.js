import { NavigationContainer } from "@react-navigation/native";
import { useAuthContext } from "./hooks/useAuthContext";

import AuthNavigator from "./navigations/AuthNavigator";
import BottomTabNavigator from "./navigations/BottomTabNavigator";
import DrawerNavigator from "./navigations/DrawerNavigator";

export default function AppNavigation() {
  const { user } = useAuthContext();

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthNavigator />}
      {/* <BottomTabNavigator /> */}
    </NavigationContainer>
  );
}
