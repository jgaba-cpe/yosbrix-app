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

// utilities
import { colors } from "../utilities/Colors";
import {
  screenWidth,
  screenHeight,
  statusBarHeight,
} from "../utilities/LayoutTools";

// utilities
import { useNavigation } from "@react-navigation/native";

// assets
import {
  hamburgerMenuBrownIcon,
  yosbrix,
  gaba,
  garcia,
  marmito,
  regio,
} from "../assets/index";

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

  return (
    <View style={styles.container}>
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
      <StatusBar style="dark" />
      <View style={styles.banner}>
        <Text style={styles.txtTitle}>About Us</Text>
      </View>
      <ScrollView>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={yosbrix}
          />
          <Text
            style={
              Platform.OS === "ios"
                ? styles.txtLogoDesc
                : [styles.txtLogoDesc, { fontSize: 21 }]
            }
          >
            YosBrix is a mobile application that monitors the processes of brick
            molding.
          </Text>
        </View>
        <View style={styles.devMainContainer}>
          <Text style={styles.txtDevTitle}>Developers</Text>

          <View style={styles.devContainer}>
            <Image
              style={styles.imgProfile}
              source={garcia}
            />
            <Text style={styles.txtDevName}>Mary Cris Garcia</Text>
            <Text style={styles.txtElective}>Intelligent Systems</Text>
          </View>

          <View style={styles.devContainer}>
            <Image
              style={styles.imgProfile}
              source={gaba}
            />
            <Text style={styles.txtDevName}>Jander Gaba</Text>
            <Text style={styles.txtElective}>System Administration</Text>
          </View>

          <View style={styles.devContainer}>
            <Image
              style={styles.imgProfile}
              source={marmito}
            />
            <Text style={styles.txtDevName}>Roxanne Marmito</Text>
            <Text style={styles.txtElective}>System Administration</Text>
          </View>

          <View style={styles.devContainer}>
            <Image
              style={styles.imgProfile}
              source={regio}
            />
            <Text style={styles.txtDevName}>Clarissa Regio</Text>
            <Text style={styles.txtElective}>System Administration</Text>
          </View>
        </View>
      </ScrollView>
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
  logoContainer: {
    width: "70%",
    height: "10%",
    backgroundColor: colors.tertiary,
    marginTop: 10,
    marginLeft: 60,
    alignItems: "center",
    textAlign: "left",
  },

  logo: {
    height: 120,
    width: 120,
    resizeMode: "contain",
    alignSelf: "center",
  },

  devMainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primary,
    marginTop: 150,
    alignItems: "center",
    marginBottom: 20,
  },

  imgProfile: {
    height: 100,
    width: 100,
    resizeMode: "contain",
    alignItems: "center",
    marginTop: 20,
  },

  devContainer: {
    width: 200,
    height: 200,
    marginTop: 20,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.tertiary,
  },

  txtLogoDesc: {
    fontSize: 18,
    fontFamily: "LatoRegular",
    color: colors.black75,
    textAlign: "center",
  },

  txtDevTitle: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 31,
    fontFamily: "LatoBold",
    color: colors.tertiary,
  },

  txtDevName: {
    marginTop: 20,
    textAlign: "right",
    fontSize: 20,
    fontFamily: "LatoBold",
    color: colors.black75,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  txtElective: {
    textAlign: "right",
    fontSize: 13,
    fontFamily: "LatoRegular",
    color: colors.black75,
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  txtTitle: {
    fontSize: 39,
    fontFamily: "LatoBold",
    color: colors.black75,
  },
});
