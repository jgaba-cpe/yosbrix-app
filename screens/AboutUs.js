// layout
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
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
  hamburgerMenuBrownIcon,
  yosbrix,
  gaba,
  garcia,
  marmito,
  regio,
} from "../assets/index";
import Wave from "../assets/svg/Wave";
import Hamburger from "../assets/svg/Hamburger Menu Icon.svg";

// ------------------------- MAIN CODE ------------------------- //
const AboutUs = () => {
  const navigation = useNavigation();

  if (Platform.OS === "ios") {
    console.log(`IOS | Width: ${screenWidth}, Height: ${screenHeight}`);
  } else {
    console.log(`Android | Width: ${screenWidth}, Height: ${screenHeight}`);
  }

  let [fontsLoaded] = useFonts({
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  const bannerContainerHeight = screenHeight * 0.2527;
  const bannerHeight = bannerContainerHeight * 0.869565;
  const bannerWaveHeight = bannerHeight * 0.6;

  return (
    <View style={styles.container}>
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
            <Text style={styles.aboutUsText}>About Us</Text>
          </View>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.subText}>
            Meet the Team
          </Text>
        </View>
        <View style={styles.bannerWave}>
          <Wave height={bannerWaveHeight} />
        </View>
      </View>
      {/* ---------------------- SCROLL VIEW ---------------------- */}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={yosbrix} />
        <Text style={styles.txtRegularLogo}>
          YosBrix is a mobile application that monitors
        </Text>
        <Text style={styles.txtRegularLogo}>
          the processes of brick molding
        </Text>
      </View>

      <View style={styles.devMainContainer}>
        <View style={styles.columnContainer}>
          <View style={styles.redContainer}>
            <Text style={styles.txtDevTitle}>Meet the Team</Text>
            <Text style={styles.txtDevTitle}></Text>
          </View>
          <View style={styles.whiteContainer}>
            <ScrollView>
              <View style={styles.devContainer}>
                <Image style={styles.imgProfile} source={gaba} />
                <Text style={styles.txtDevName}>Jander Gaba</Text>
                <Text style={styles.txtElective}>System Administration</Text>
              </View>
              <View style={styles.devContainer}>
                <Image style={styles.imgProfile} source={garcia} />
                <Text style={styles.txtDevName}>Mary Cris Garcia</Text>
                <Text style={styles.txtElective}>Intelligent Systems</Text>
              </View>
              <View style={styles.devContainer}>
                <Image style={styles.imgProfile} source={marmito} />
                <Text style={styles.txtDevName}>Roxanne Marmito</Text>
                <Text style={styles.txtElective}>System Administration</Text>
              </View>

              <View style={styles.devContainer}>
                <Image style={styles.imgProfile} source={regio} />
                <Text style={styles.txtDevName}>Clarissa Regio</Text>
                <Text style={styles.txtElective}>System Administration</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AboutUs;

// ------------------------- STYLES ------------------------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
    marginTop: statusBarHeight,
  },
  bannerContainer: {
    position: "relative",
    // 160 is what percent of 728 = 21.98%
    height: screenHeight * 0.2198,
    width: "100%",
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
  aboutUsText: {
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

  logoContainer: {
    //marginTop: 16,
    marginTop: screenHeight * 0.022,
    //height: 192
    height: screenHeight * 0.264,
    /// width: 328,
    width: screenWidth * 0.9111,
    backgroundColor: colors.white,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 16,
    // borderWidth: 2,
    // borderColor: colors.primary,
  },
  logo: {
    // marginTop: 16
    marginTop: screenHeight * 0.022,
    height: 120,
    width: 120,
    resizeMode: "contain",
    alignSelf: "center",
  },
  columnContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  devMainContainer: {
    //marginTop: 16,
    marginTop: screenHeight * 0.02,
    alignItems: "center",
    flexDirection: "column",
  },
  devContainer: {
    //marginTop: 16
    marginTop: screenHeight * 0.022,
    //height: 176
    height: screenHeight * 0.242,
    // width: 176
    width: screenWidth * 0.5,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.tertiary,
    // borderColor: colors.primary,
    // borderWidth: 2,
  },
  redContainer: {
    // height: 144,
    height: screenHeight * 0.198,
    // width: 360,
    width: screenWidth * 1,
    backgroundColor: colors.primary,
    borderTopLeftRadius: 72,
    borderTopRightRadius: 72,
  },
  whiteContainer: {
    position: "absolute",
    top: 64,
    alignItems: "center",
    // height: 289,
    height: screenHeight * 0.352,
    // width: 360,
    width: screenWidth * 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  txtTitle: {
    fontSize: 39,
    fontFamily: "LatoBold",
    color: colors.white,
  },
  txtRegularHeader: {
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: colors.white,
  },
  txtRegularLogo: {
    fontSize: 16,
    fontFamily: "LatoRegular",
    color: colors.black75,
    textAlign: "center",
  },

  txtLogoDesc: {
    fontSize: 18,
    fontFamily: "LatoRegular",
    color: colors.black75,
    textAlign: "center",
  },
  txtDevTitle: {
    // marginTop: 16
    marginTop: screenHeight * 0.022,
    textAlign: "center",
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },
  imgProfile: {
    //marginTop: 16
    marginTop: screenHeight * 0.022,
    height: 100,
    width: 100,
    resizeMode: "contain",
    alignItems: "center",
  },
  txtDevName: {
    //marginTop: 8
    marginTop: screenHeight * 0.011,
    fontSize: 20,
    fontFamily: "LatoBold",
    color: colors.black75,
  },
  txtElective: {
    fontSize: 13,
    fontFamily: "LatoRegular",
    color: colors.black75,
  },

});
