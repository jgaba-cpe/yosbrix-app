import { LogBox } from "react-native";
import { AuthContextProvider } from "./context/AuthContext";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Login from "./screens/Login";
import Register from "./screens/Register";
import Dashboard from "./screens/Dashboard"

const Stack = createStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
LogBox.ignoreLogs(["expo-permissions is now deprecated"]);
LogBox.ignoreLogs([
  "Cannot update a component (`ForwardRef(BaseNavigationContainer)`)",
]);

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContextProvider>
  );
}
