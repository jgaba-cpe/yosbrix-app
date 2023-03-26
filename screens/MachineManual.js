// layout
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";

// navigation
import { useNavigation } from "@react-navigation/native";

// constants
import { colors } from "../constants/Colors";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../constants/LayoutTools";

// assets
import { hamburgerMenuBrownIcon } from "../assets/index";

// ------------------------- MAIN CODE ------------------------- //
const MachineManual = () => {
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
        <Text style={styles.txtTitle}>Machine Manual</Text>
      </View>

      <View style={styles.stepsMainContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.txtStepNum}>0</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.txtDescription1}>PREPARE THE INGREDIENTS:</Text>
          <Text style={styles.txtDetails}>2.4 kg regular terracota clay</Text>
          <Text style={styles.txtDetails}>270 ml water</Text>
          <Text style={styles.txtDetails}>27 grams of cigarette butts</Text>
        </View>
      </View>

      <View style={styles.stepsMainContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.txtStepNum}>1</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.txtDescription1}>
            PLUG THE MACHINE IN A POWER SOURCE
          </Text>
        </View>
      </View>

      <View style={styles.stepsMainContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.txtStepNum}>2</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.txtDescription1}>
            USING THE KEYPAD, ENTER THE PASSWORD FOR THE MACHINE
          </Text>
        </View>
      </View>

      <View style={styles.stepsMainContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.txtStepNum}>3</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.txtDescription1}>
            THE INGREDIENTS WILL BE DISPLAYED IN THE LCD SCREEN. BY THIS TIME,
            IT IS ADVISABLE TO PUT THE TERRACOTTA CLAY AND WATER IN THE MIXER.
          </Text>
        </View>
      </View>

      <View style={styles.stepsMainContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.txtStepNum}>4</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.txtDescription1}>
            PUT THE CIGARETTE BUTTS IN THE SHREDDER. THEN, PRESS THE * IN THE
            KEYPAD TO START THE PROCESS.
          </Text>
        </View>
      </View>

      <View style={styles.stepsMainContainer}>
        <View style={styles.stepsContainer}>
          <Text style={styles.txtStepNum}>5</Text>
        </View>
        <View style={styles.descContainer}>
          <Text style={styles.txtDescription1}>
            AS THE MACHINE WORKS, THE STATUS OF EACH PROCESSES WILL BE SENT TO
            THIS APP TO NOTIFY YOU REGARDING THE STATUS OF THE PROCESS.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MachineManual;

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
    marginBottom: 10,
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
  stepsMainContainer: {
    height: 76,
    backgroundColor: colors.tertiary,
    flexDirection: "row",
    marginTop: 10,
  },

  stepsContainer: {
    width: 70,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },

  descContainer: {
    width: 280,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    textAlign: "left",
  },

  txtTitle: {
    fontSize: 39,
    fontFamily: "LatoBold",
    color: colors.black75,
  },

  txtStepNum: {
    fontSize: 64,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },

  txtDescription1: {
    fontSize: 10,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },

  txtDetails: {
    fontSize: 10,
    fontFamily: "LatoRegular",
    color: colors.tertiary,
  },
});
