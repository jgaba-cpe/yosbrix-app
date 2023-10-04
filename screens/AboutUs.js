// layout
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
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
import { yosbrix, gaba, garcia, marmito, regio } from "../assets/index";
import Wave from "../assets/svg/Wave";
import Hamburger from "../assets/svg/Hamburger Menu Icon.svg";
import YosBrixLogo from "../assets/svg/Yosbrix Main Logo.svg";

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
          <Text style={styles.subText}>Meet the Team</Text>
        </View>
        <View style={styles.bannerWave}>
          <Wave height={bannerWaveHeight} />
        </View>
      </View>
      {/* ---------------------- SCROLL VIEW ---------------------- */}
      {/* <View style={styles.logoContainer}>
        <YosBrixLogo style={styles.logo} />
        <Text style={styles.txtRegularLogo}>
          YosBrix is a mobile application that monitors
          the processes of brick molding
        </Text>
      </View> */}

      <View style={styles.devMainContainer}>
        {/* <View style={styles.redContainer}> */}
        <Text style={styles.txtDevTitle}>The Developers</Text>
        <Text style={styles.txtDevTitle}></Text>
        {/* </View> */}
        {/* <View style={styles.whiteContainer}> */}
        {/* <ScrollView> */}
        <View style={styles.mainColumnContainer}>
          <View style={styles.columnContainer1}>
            <View style={styles.devContainer}>
              <Image style={styles.imgProfile} source={gaba} />
              <Text style={styles.txtDevName}>Jander Gaba</Text>
              <Text style={styles.txtElective}>System Administration</Text>
            </View>

            <View style={styles.devContainer}>
              <Image style={styles.imgProfile} source={marmito} />
              <Text style={styles.txtDevName}>Roxanne Marmito</Text>
              <Text style={styles.txtElective}>System Administration</Text>
            </View>

            {/* </ScrollView> */}
            {/* </View> */}
          </View>
          <View style={styles.columnContainer2}>
            <View style={styles.devContainer}>
              <Image style={styles.imgProfile} source={garcia} />
              <Text style={styles.txtDevName}>Mary Cris Garcia</Text>
              <Text style={styles.txtElective}>Intelligent Systems</Text>
            </View>
            <View style={styles.devContainer}>
              <Image style={styles.imgProfile} source={regio} />
              <Text style={styles.txtDevName}>Clarissa Regio</Text>
              <Text style={styles.txtElective}>System Administration</Text>
            </View>
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
    //height: 200
    height: screenHeight * 0.2747,
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
  },
  devMainContainer: {
    //marginTop: 16,
    marginTop: screenHeight * 0.055,
    alignItems: "center",
    flexDirection: "column",
  },
  mainColumnContainer: {
    flexDirection: "row",
  },
  columnContainer1: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 0.5
    marginRight: 10
  },
  columnContainer2: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 0.5
    marginLeftt: 10
  },
  devContainer: {
    //marginTop: 16
    marginTop: screenHeight * 0.022,
    //height: 176
    height: screenHeight * 0.24,
    // width: 176
    width: screenWidth * 0.45,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.offwhite,
    // borderColor: colors.primary,
    // borderWidth: 2,
  },
  lastDevContainer: {
    //marginTop: 16
    marginTop: screenHeight * 0.022,
    //marginBottom: 16
    marginBottom: screenHeight * 0.022,
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
    // height: 288,
    height: screenHeight * 0.3956,
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
    // margin: 16
    marginTop: screenHeight * 0.022,
    marginRight: screenHeight * 0.022,
    marginLeft: screenHeight * 0.022,
    fontSize: 14,
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
    // marginTop: screenHeight * 0.054,
    textAlign: "center",
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.black75,
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
