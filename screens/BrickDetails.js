// layout
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// navigation
import { useNavigation } from "@react-navigation/native";

// utilities
import { colors } from "../utilities/Colors";
import KeyboardAvoidingWrapper from "../utilities/KeyboardAvoidingWrapper";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../utilities/LayoutTools";

// assets
import { hamburgerMenuBrownIcon, brickImage } from "../assets/index";

// ------------------------- MAIN CODE ------------------------- //
const BrickDetails = () => {
  const navigation = useNavigation();

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
        <StatusBar style="dark" />
        <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Image
          source={hamburgerMenuBrownIcon}
          style={styles.hamburgerMenuIcon}
        />
      </TouchableOpacity>
        <View style={styles.banner}>
          <Text style={styles.title}>About Bricks</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.brickContainer}>
            <Text style={styles.brickName}>SUNDRIED BRICKS</Text>
            <Image
              style={styles.sundried}
              source={brickImage}
            />
            <Text style={styles.credit}>
              Credit: STEVE PERCIVEAL/SCIENCE PHOTO LIBRARY
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.details}>
              The main product of this machine is a molded brick made of
              terracotta clay mixed with cigarette butts and is ready to be sun
              dried.
            </Text>
          </View>
        </View>
      </View>
    </KeyboardAvoidingWrapper>
  );
};

export default BrickDetails;

// ------------------------- STYLES ------------------------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
    marginTop: statusBarHeight,
  },
  hamburgerMenuIcon: {
    // marginTop: 24,
    // marginTop: "3.09%",
    marginTop: screenHeight * 0.0309,
    marginBottom: screenHeight * 0.0309,
    // marginLeft: 16,
    // marginLeft: "4.44%",
    marginLeft: screenWidth * 0.04,
  },
  banner: {
    // height: 77,
    height: screenHeight * 0.1,
    // height: "9.92%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopColor: colors.tertiary,
    // borderTopWidth: 50,
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

  title: {
    color: colors.titles,
    fontFamily: "LatoBold",
    fontSize: 39,
  },

  form: {
    // height: 560,
    height: screenHeight * 0.8,
    // height: "70%",
    width: "100%",
    marginTop: "10%",
    alignItems: "center",
    // borderWidth: 0.5,
  },

  brickContainer: {
    // height: 240,
    height: screenHeight * 0.3,
    // height: "20%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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

  sundried: {
    marginTop: "5%",
    width: "100.00%",
    resizeMode: "stretch",
  },

  brickName: {
    marginTop: "8%",
    color: colors.white,
    fontFamily: "LatoRegular",
    fontSize: 30,
  },

  credit: {
    marginTop: "2%",
    color: colors.black100,
    fontFamily: "LatoRegular",
    fontSize: 10,
  },

  detailContainer: {
    // height: 240,
    height: screenHeight * 0.4,
    // height: "20%",
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.primary,
    marginTop: "18%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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

  details: {
    marginTop: "2%",
    marginLeft: "3%",
    marginRight: "3%",
    color: colors.white,
    fontFamily: "LatoBold",
    fontSize: 16,
  },
});
