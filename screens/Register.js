// layout
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// navigation
import { useNavigation } from "@react-navigation/native";

// firebase config
import { auth } from "../firebase/config";

// firebase hooks
import { useSignup } from "../hooks/useSignup";

// components
import CustomTextInput from "../components/CustomTextInput";
import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

// constants
import { colors } from "../constants/Colors";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../constants/LayoutTools";

// assets
import YosBrixLogo from "../assets/svg/Yosbrix Main Logo.svg";

// animations
import { MotiView } from "moti";

// ------------------------- MAIN CODE ------------------------- //
const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Dashboard");
      }
    });
    return unsub;
  }, []);

  const { signup, isPending, error } = useSignup();

  const handleDisplayNameInput = (userInput) => {
    setDisplayName(userInput);
  };

  const handleEmailInput = (userInput) => {
    setEmail(userInput);
  };

  const handlePasswordInput = (userInput) => {
    setPassword(userInput);
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    signup(email, password, displayName);
  };

  if (Platform.OS === "ios") {
    console.log(`IOS | Width: ${screenWidth}, Height: ${screenHeight}`);
  } else {
    console.log(`Android | Width: ${screenWidth}, Height: ${screenHeight}`);
  }

  let [fontsLoaded] = useFonts({
    LatoLight: require("../assets/fonts/Lato-Light.ttf"),
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <KeyboardAvoidingWrapper>
      <View style={styles.container}>
        {Platform.OS === "android" && (
          <StatusBar style="dark" backgroundColor={colors.white} />
        )}
        {Platform.OS === "ios" && <StatusBar style="dark" />}
        <View style={styles.banner}>
          <MotiView
            from={{ opacity: 0, translateY: -50 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 100 }}
          >
            <YosBrixLogo />
          </MotiView>
        </View>
        <View style={styles.form}>
          {error && (
            <View style={styles.errorMsgBox}>
              <Text style={styles.errorText}>Please input valid email.</Text>
            </View>
          )}
          <CustomTextInput
            placeholder={"Display Name"}
            autoCapitalize={"words"}
            onUserInput={handleDisplayNameInput}
          />
          <CustomTextInput
            placeholder={"Email"}
            keyboardType={"email-address"}
            onUserInput={handleEmailInput}
          />
          <CustomTextInput
            placeholder={"Password"}
            secureTextEntry={true}
            onUserInput={handlePasswordInput}
          />
          {!isPending && (
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>REGISTER</Text>
            </TouchableOpacity>
          )}
          {isPending && (
            <TouchableOpacity style={styles.buttonIsLoading}>
              <ActivityIndicator size="small" color={colors.white} />
              <Text style={styles.buttonTextIsLoading}>REGISTER</Text>
            </TouchableOpacity>
          )}
          <View style={styles.linkContainer}>
            <Text style={styles.normalText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default Register;

// ------------------------- STYLES ------------------------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
    marginTop: statusBarHeight,
  },
  banner: {
    // height: 240,
    height: screenHeight * 0.3,
    // height: "30%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    // borderWidth: 0.5,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  logo: {
    height: "48.33%",
    width: "39.44%",
    resizeMode: "contain",
  },
  form: {
    // height: 560,
    height: screenHeight * 0.7,
    // height: "70%",
    width: "100%",
    marginTop: "17.143%",
    alignItems: "center",
    // borderWidth: 0.5,
  },
  errorMsgBox: {
    height: "5.71%",
    width: "80%",
    marginBottom: "4.29%",
    paddingLeft: "3.47%",
    borderRadius: 8,
    backgroundColor: colors.errorBackground,
    borderColor: colors.errorBorder,
    borderWidth: 1,
    justifyContent: "center",
  },
  errorText: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black50,
  },
  button: {
    height: "7.143%",
    width: "80%",
    marginBottom: "4.29%",
    borderRadius: 8,
    backgroundColor: colors.primary,
    borderColor: colors.white,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontFamily: "LatoBold",
    fontSize: 20,
    letterSpacing: 3,
  },
  buttonIsLoading: {
    height: "7.143%",
    width: "80%",
    marginBottom: "4.29%",
    borderRadius: 8,
    backgroundColor: colors.primary80,
    borderColor: colors.white,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextIsLoading: {
    color: colors.white,
    fontFamily: "LatoBold",
    fontSize: 20,
    letterSpacing: 3,
    marginLeft: "2.78%",
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  normalText: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.black50,
  },
  linkText: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.secondary,
  },
});
