// layout
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
} from "react-native";
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
import {
  step0Image,
  step1Image,
  step2Image,
  step3Image,
  step4Image,
  step5Image,
} from "../assets/index";
import Wave from "../assets/svg/Wave";
import Hamburger from "../assets/svg/Hamburger Menu Icon.svg";
import YosbrixFaded from "../assets/svg/Yosbrix Faded Logo.svg";

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

  const bannerContainerHeight = screenHeight * 0.2527;
  const bannerHeight = bannerContainerHeight * 0.869565;
  const bannerWaveHeight = bannerHeight * 0.6;

  return (
    <View style={styles.container}>
      {Platform.OS === "android" && (
        <StatusBar style="dark" backgroundColor={colors.white} />
      )}
      {Platform.OS === "ios" && <StatusBar style="dark" />}
      {/* ---------------------- BANNER ---------------------- */}
      <View style={styles.bannerContainer}>
        <View style={styles.banner}>
          <View style={styles.bannerHeader}>
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Hamburger />
            </TouchableOpacity>
            <Text style={styles.manualText}>Manual</Text>
          </View>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.subText}>Learn how to use the machine.</Text>
        </View>
        <View style={styles.bannerWave}>
          <Wave height={bannerWaveHeight} />
        </View>
      </View>
      {/* ---------------------- STEPS ---------------------- */}
      <YosbrixFaded style={styles.yosbrixFaded} />
      <ScrollView>
        <View style={styles.stepContainer}>
          <View style={styles.top}>
            <Text style={styles.titleText}>PREPARE THE MATERIALS</Text>
          </View>
          <View style={styles.bottom}>
            <Image style={styles.step0gif} source={step0Image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>1. kg Terracotta Clay</Text>
              <Text style={styles.text}>2. ml Water</Text>
              <Text style={styles.text}>3. gm Cigaretter Butts</Text>
            </View>
          </View>
        </View>
        <View style={styles.stepContainer}>
          <View style={styles.top}>
            <Text style={styles.titleText}>POWER THE MACHINE</Text>
          </View>
          <View style={styles.bottom}>
            <Image style={styles.step1gif} source={step1Image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Plug the machine in</Text>
              <Text style={styles.text}>the power source</Text>
              <Text style={styles.text}>to turn it on.</Text>
            </View>
          </View>
        </View>
        <View style={styles.stepContainer}>
          <View style={styles.top}>
            <Text style={styles.titleText}>ENTER THE PASSWORD</Text>
          </View>
          <View style={styles.bottom}>
            <Image style={styles.step2gif} source={step2Image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Using the keypad,</Text>
              <Text style={styles.text}>enter the password</Text>
              <Text style={styles.text}>for the machine.</Text>
              <Text style={styles.text}>Press * to enter.</Text>
            </View>
          </View>
        </View>
        <View style={styles.stepContainer}>
          <View style={styles.top}>
            <Text style={styles.titleText}>INTO THE MIXER</Text>
          </View>
          <View style={styles.bottom}>
            <Image style={styles.step3gif} source={step3Image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>The materials needed will,</Text>
              <Text style={styles.text}>be displayed in the LCD</Text>
              <Text style={styles.text}>screen. By this time, it's</Text>
              <Text style={styles.text}>advisable to put the</Text>
              <Text style={styles.text}>terracotta clay and</Text>
              <Text style={styles.text}>water in the mixer.</Text>
            </View>
          </View>
        </View>
        <View style={styles.stepContainer}>
          <View style={styles.top}>
            <Text style={styles.titleText}>INTO THE SHREDDER</Text>
          </View>
          <View style={styles.bottom}>
            <Image style={styles.step4gif} source={step4Image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>Put the cigarette butts</Text>
              <Text style={styles.text}>in the shredder. Then,</Text>
              <Text style={styles.text}>press the * in the keypad</Text>
              <Text style={styles.text}>to start the process.</Text>
            </View>
          </View>
        </View>
        <View style={styles.stepContainer}>
          <View style={styles.top}>
            <Text style={styles.titleText}>SEE THE NOTIFICATION</Text>
          </View>
          <View style={styles.bottom}>
            <Image style={styles.step5gif} source={step5Image} />
            <View style={styles.textContainer}>
              <Text style={styles.text}>As the machine works, the</Text>
              <Text style={styles.text}>status of each process</Text>
              <Text style={styles.text}>will be sent to this app to</Text>
              <Text style={styles.text}>notify you regarding</Text>
              <Text style={styles.text}>the status of the process.</Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    alignItems: "center",
  },
  yosbrixFaded: {
    position: "absolute",
    // 240 is what percent of 728 = 33%
    top: screenHeight * 0.33,
    // 200 is what percent of 360 = 55.56%
    right: screenWidth * 0.5556,
  },
  // ----- BANNER ----- //
  bannerContainer: {
    position: "relative",
    // 160 is what percent of 728 = 21.98%
    height: screenHeight * 0.2198,
    width: "100%",
    // 8 is what percent of 728 = 1.09%
    marginBottom: screenHeight * 0.011,
  },
  banner: {
    alignItems: "center",
    // 160 is what percent of 184 = 85.9565%
    height: "86.9565%",
    width: "100%",
    backgroundColor: colors.primary,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
  },
  bannerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // 320 is what percent of 360 = 88.89%
    width: screenWidth * 0.8889,
    // 40 is what percent of 728 = 5.49%%
    marginTop: screenHeight * 0.0549,
  },
  hamburgerMenu: {},
  manualText: {
    fontFamily: "LatoBold",
    fontSize: 39,
    color: colors.white,
  },
  subTextContainer: {
    position: "absolute",
    zIndex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // 320 is what percent of 360 = 88.89%
    width: screenWidth * 0.8889,
    // 96 is what percent of 728 = 13.19%
    top: screenHeight * 0.1319,
    // 24 is what percent of 360 = 6.67%
    right: screenWidth * 0.0667,
  },
  subText: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.white,
  },
  bannerWave: {
    position: "absolute",
    // 64 is what percent of 728 = 8.79%
    top: screenHeight * 0.0879,
  },
  // ----- STEPS ----- //
  stepContainer: {
    // 152 is what percent of 728 = 20.88%
    height: screenHeight * 0.2088,
    // 272 is what percent of 360 = 75.56%
    width: screenWidth * 0.7556,
    // 24 is what percent of 728 = 3.3%
    marginTop: screenHeight * 0.033,
    borderWidth: 2,
    borderColor: colors.black5,
    backgroundColor: colors.white,
    borderRadius: 16,
  },
  top: {
    justifyContent: "center",
    alignItems: "center",
    // 40 is what percent of 152 = 26.32%
    height: "26.32%",
    width: "100%",
    borderBottomWidth: 0.5,
    borderColor: colors.black10,
  },
  titleText: {
    fontFamily: "LatoBold",
    fontSize: 16,
    color: colors.secondary,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly", 
    alignItems: "center",
    // 112 is what percent of 152 = 73.68%
    height: "73.68%",
    width: "100%",
    // borderWidth: 0.5,
    borderColor: colors.black10,
  },
  step0gif: {
    height: 96,
    width: 96,
  },
  step1gif: {
    height: 96,
    width: 96,
  },
  step2gif: {
    height: 96,
    width: 96,
  },
  step3gif: {
    height: 80,
    width: 70.5,
  },
  step4gif: {
    height: 96,
    width: 89.41,
  },
  step5gif: {
    height: 80,
    width: 79.06,
  },
  textContainer: {},
  text: {
    fontFamily: "LatoRegular",
    fontSize: 13,
    color: colors.black75,
  },
});
