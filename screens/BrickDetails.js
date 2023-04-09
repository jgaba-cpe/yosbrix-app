// layout
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import Swiper from "react-native-swiper";

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
  brickImage,
  brickImage2,
  brickImage3,
  brickImage4,
} from "../assets/index";
import Wave from "../assets/svg/Wave";
import Hamburger from "../assets/svg/Hamburger Menu Icon.svg";

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
            <Text style={styles.aboutBrickText}>About Brick</Text>
          </View>
        </View>
        <View style={styles.subTextContainer}>
          <Text style={styles.subText}>The brick and its details.</Text>
        </View>
        <View style={styles.bannerWave}>
          <Wave height={bannerWaveHeight} />
        </View>
      </View>
      {/* ---------------------- IMAGE SLIDER ---------------------- */}
      <View style={styles.swiperContainer}>
        <Swiper
          showsPagination={true}
          dotStyle={styles.paginationDot}
          activeDotStyle={styles.activePaginationDot}
          autoplay={true}
        >
          <View style={styles.slide}>
            <Image style={styles.brickImage} source={brickImage} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.brickImage} source={brickImage2} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.brickImage} source={brickImage3} />
          </View>
          <View style={styles.slide}>
            <Image style={styles.brickImage} source={brickImage4} />
          </View>
        </Swiper>
      </View>
      {/* ---------------------- INFORMATIONS ---------------------- */}
      
      <ScrollView>
        <View style={styles.informationContainer}>
          <Text style={styles.information}>
            The main product of this machine is a molded brick made of
            terracotta clay mixed with cigarette butts and is ready to be sun
            dried.
          </Text>
        </View>
        {/* ---------------------- BENEFITS ---------------------- */}
        <View style={styles.redContainer}>
          <Text style={styles.benefitsTitle}>
            BENEFITS OF BRICKS WITH CIGARETTE BUTTS
          </Text>
        </View>
        <View style={styles.whiteContainer}>
          <Text style={styles.benefitsContent}>
            1. Compressive strength is more than 85 percent lower than that of
            normal bricks.
          </Text>
          <Text style={styles.benefitsContent}>
            2. Water absorption increases as cigarette butt content increases.
          </Text>
          <Text style={styles.benefitsContent}>
            3. Porosity and contraction of cigarette butt bricks are minimal.
          </Text>
          <Text style={styles.benefitsContent}>
            4. Lightweight and have a high insulating capacity.
          </Text>
        </View>
        {/* ---------------------- MATERIALS ---------------------- */}
        <View style={styles.redContainer}>
          <Text style={styles.materialsTitle}>
            RAW MATERIALS PER MACHINE EXECUTION
          </Text>
        </View>
        <View style={styles.white2Container}>
          <Text style={styles.materialsContent}>
            The machine can only produce 2 bricks per execution. These raw
            materials are for 2 bricks only:
          </Text>
          <Text style={styles.materialsContent}>
            1. 2.70 kilograms of Terracotta Clay.
          </Text>
          <Text style={styles.materialsContent}>
            2. 270 mililliters of Water.
          </Text>
          <Text style={styles.materialsContent}>
            3. 27 grams of Cigarette Butts.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BrickDetails;

// ------------------------- STYLES ------------------------- //
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tertiary,
    marginTop: statusBarHeight,
    alignItems: "center",
  },
  // ----- BANNER ----- //
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
  aboutBrickText: {
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
  // ----- BRICK NAME ----- //
  brickNameContainer: {
    alignItems: "center",
    marginTop: screenHeight * 0.021,
  },

  brickName: {
    fontSize: 25,
    fontFamily: "LatoBold",
    color: colors.black100,
  },
  // ----- IMAGE SLIDER ----- //
  swiperContainer: {
    borderColor: colors.primary,
    marginTop: screenHeight * 0.031,
    height: screenHeight * 0.3186,
    width: "100%",
  },

  slide: {
    flexDirection: "row",
    height: screenHeight * 0.3186,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  brickImage: {
    height: 240,
    width: "88%",
    borderRadius: 8,
  },

  paginationDot: {
    bottom: 1,
    width: 8,
    height: 8,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: colors.secondary,
  },
  activePaginationDot: {
    bottom: 1,
    backgroundColor: colors.primary,
  },
  // ----- INFORMATION ----- //

  informationContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: screenHeight * 0.021,
    // height: 96,
    height: screenHeight * 0.1318,
    // height: 38.46%
    // width: 328,
    width: screenWidth * 0.9111,
    // width: 91.11%
    // backgroundColor: colors.primary,
    // borderWidth: 0.5,
    // borderRadius: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.17,
    // shadowRadius: 3.05,
    // elevation: 4,
  },

  information: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    marginLeft: "4.87%",
    marginRight: "4.87%",
    color: colors.secondary,
    textAlign: "center",
  },

  redContainer: {
    marginTop: screenHeight * 0.021,
    // height: 32,
    height: screenHeight * 0.07,
    // width: 120,
    width: screenWidth * 0.911,
    backgroundColor: colors.primary,
    alignItems: "center",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },

  benefitsTitle: {
    textAlign: "center",
    fontFamily: "LatoBold",
    fontSize: 16,
    color: colors.white,
    marginTop: "5.71%",
    // marginLeft: "4.87%",
    // marginRight: "4.87%",
  },

  whiteContainer: {
    alignContent: "center",
    // 264 is what percent of 728 = 36.26%
    height: screenHeight * 0.3626,
    // width: 120,
    width: screenWidth * 0.911,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  benefitsContent: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.black100,
    marginTop: "5.71%",
    marginLeft: "4.87%",
    marginRight: "4.87%",
  },

  white2Container: {
    alignContent: "center",
    // height: 48,
    height: screenHeight * 0.2857,
    // width: 120,
    width: screenWidth * 0.911,
    marginBottom: 20,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },

  materialsTitle: {
    textAlign: "center",
    fontFamily: "LatoBold",
    fontSize: 16,
    color: colors.white,
    marginTop: "5.71%",
    // marginLeft: "4.87%",
    // marginRight: "4.87%",
  },
  materialsContent: {
    fontFamily: "LatoRegular",
    fontSize: 16,
    color: colors.black100,
    marginTop: "5.71%",
    marginLeft: "4.87%",
    marginRight: "4.87%",
  },
});
