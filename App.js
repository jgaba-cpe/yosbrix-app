// import "react-native-gesture-handler";
import { LogBox } from "react-native";
import { AuthContextProvider } from "./context/AuthContext";
import AppNavigation from "./AppNavigation";

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
LogBox.ignoreLogs(["expo-permissions is now deprecated"]);
LogBox.ignoreLogs(["Sending `onAnimatedValueUpdate`"]);
LogBox.ignoreLogs(["Each child in a list should have a unique"]);

export default function App() {
  return (
    <AuthContextProvider>
      <AppNavigation />
    </AuthContextProvider>
  );
}
