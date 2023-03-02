import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { colors } from "../utilities/Colors";

const Login = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -150 : -160}
      style={styles.container}
    >
      <SafeAreaView>
        <View style={styles.banner}></View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.black50}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.black50}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.linkContainer}>
            <Text style={styles.normalText}>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Create Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
  },
  banner: {
    height: "30%",
    width: "100%",
    backgroundColor: colors.white,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  form: {
    height: "70%",
    width: "100%",
    marginTop: "17.143%",
    alignItems: "center",
    // borderWidth: 0.5,
  },
  input: {
    height: "7.143%",
    width: "80%",
    marginBottom: "4.29%",
    paddingLeft: "3.47%",
    borderRadius: 8,
    backgroundColor: colors.white,
    borderColor: colors.secondary,
    borderWidth: 1,
    fontSize: 13,
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
    fontSize: 20,
    letterSpacing: 1,
  },
  linkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  normalText: {
    fontSize: 16,
    color: colors.black50,
  },
  linkText: {
    fontSize: 16,
    color: colors.secondary,
  },
});
