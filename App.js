import { LogBox } from "react-native";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Login from "./screens/Login";
import Register from "./screens/Register";
import PlayGround from "./screens/PlayGround";

const Stack = createStackNavigator();

LogBox.ignoreLogs(["expo-permissions is now deprecated"]);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PlayGround" component={PlayGround} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
